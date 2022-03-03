import { useState, useEffect } from 'react';
import { Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';

import { BridgeInterface } from '../constants';
import { ERC20Interface } from '../library/constants/abi';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';
import useTokenAllowance from '../library/hooks/useTokenAllowance';
import useTokenBalance from '../library/hooks/useTokenBalance';
import useTokenDecimals from '../library/hooks/useTokenDecimals';
import useMyNFPsForChain from './useMyNFPsForChain';
import { useContractCalls } from '../library/hooks/useContractCall';
import useContractFunction from '../library/hooks/useContractFunction';
import useDebounce from '../library/hooks/useDebounce';
import { ChainId } from '../library/constants/chains';

import { CHAIN_INFO } from '../configs';

import { useTokenPriceSigQuery } from '../graphql/generated';

export type BridgeDepositInfo = {
  amount: BigNumber | undefined;
  chainTo: number | undefined;
  token: string | undefined;
  recipient: string | undefined;
  useTokens: boolean;
  nfpId: number | undefined;
};

export function useBridge(chainId: ChainId, depositInfo: BridgeDepositInfo) {
  const { currentAccount } = useWeb3ConnectionsContext();
  const chainData = CHAIN_INFO[chainId];

  const [bridgeDepositFeeError, setBridgeDepositFeeError] = useState('');

  const chainGasPriceSig = useTokenPriceSigQuery({
    variables: {
      chainId,
      token: chainData.gasTokenAddress?.substring(4),
    },
  });

  const tokenPriceSig = useTokenPriceSigQuery({
    variables: {
      chainId,
      token: depositInfo.token?.substring(4),
    },
  });

  const nfps = useMyNFPsForChain(chainId);

  const debouncedAmount = useDebounce(depositInfo.amount, 250);

  const [_minimum, _depositFees, _tokensLastUsedAt, ..._nfpsLastUsedAt] =
    useContractCalls(
      chainId,
      [
        chainData.bridgeAddress && {
          abi: BridgeInterface,
          address: chainData.bridgeAddress.substring(4),
          method: 'minimum',
          args: [depositInfo.token?.substring(4)],
        },
        chainData.bridgeAddress && {
          abi: BridgeInterface,
          address: chainData.bridgeAddress.substring(4),
          method: 'depositFees',
          args: [
            currentAccount,
            {
              amount: debouncedAmount,
              chainTo: depositInfo.chainTo,
              token: depositInfo.token?.substring(4),
              needsEther: false,
              recipient: depositInfo.recipient,
              nfpId: BigNumber.from(depositInfo.nfpId ?? 0),
            },
            {
              price: BigNumber.from(
                depositInfo.useTokens
                  ? chainGasPriceSig?.data?.tokenPriceSig?.tokenPrice ?? 0
                  : 0,
              ),
              validUntil: BigNumber.from(
                depositInfo.useTokens
                  ? chainGasPriceSig?.data?.tokenPriceSig?.validUntil ?? 0
                  : 0,
              ),
              signature: depositInfo.useTokens
                ? chainGasPriceSig?.data?.tokenPriceSig?.sig ?? []
                : [],
            },
            {
              price: BigNumber.from(
                tokenPriceSig?.data?.tokenPriceSig?.tokenPrice ?? 0,
              ),
              validUntil: BigNumber.from(
                tokenPriceSig?.data?.tokenPriceSig?.validUntil ?? 0,
              ),
              signature: tokenPriceSig?.data?.tokenPriceSig?.sig ?? [],
            },
          ],
          catch: (e) => setBridgeDepositFeeError(e.reason),
        },
        chainData.bridgeAddress && {
          abi: BridgeInterface,
          address: chainData.bridgeAddress.substring(4),
          method: 'tokensLastUsed',
          args: [currentAccount],
        },
        ...nfps.map(
          (nfpData) =>
            chainData.bridgeAddress && {
              abi: BridgeInterface,
              address: chainData.bridgeAddress.substring(4),
              method: 'nfpLastUsed',
              args: [nfpData.tokenId],
            },
        ),
      ],
      false,
    ) ?? [];

  const decimals =
    useTokenDecimals(chainId, depositInfo.token?.substring(4)) ?? 18;

  const [
    minimum,
    amountToRecieve,
    cost,
    expectedFee,
    fee,
    nfpUsed,
    tokensUsed,
    tokensLastUsedAt,
    ...nfpsLastUsedAt
  ] = [
    _minimum
      ? _minimum[0].mul(BigNumber.from(10).pow(18 - decimals))
      : BigNumber.from(0),
    _depositFees
      ? _depositFees[0].mul(BigNumber.from(10).pow(18 - decimals))
      : BigNumber.from(0),
    _depositFees
      ? _depositFees[1].mul(BigNumber.from(10).pow(18 - decimals))
      : BigNumber.from(0),
    _depositFees
      ? _depositFees[2].mul(BigNumber.from(10).pow(18 - decimals))
      : BigNumber.from(0),
    _depositFees
      ? _depositFees[3].mul(BigNumber.from(10).pow(18 - decimals))
      : BigNumber.from(0),
    _depositFees ? _depositFees[4] : false,
    _depositFees ? _depositFees[5] : false,
    _tokensLastUsedAt ? _tokensLastUsedAt[0].toNumber() : 0,
    _nfpsLastUsedAt
      ? _nfpsLastUsedAt.map((nfpLastUsedAt) =>
          nfpLastUsedAt ? nfpLastUsedAt[0].toNumber() : 0,
        )
      : [],
  ];

  useEffect(() => {
    if (_depositFees) {
      setBridgeDepositFeeError('');
    }
  }, [_depositFees]);

  let balance =
    useTokenBalance(chainId, depositInfo.token?.substring(4), currentAccount) ??
    BigNumber.from(0);

  if (balance && decimals) {
    balance = balance.mul(BigNumber.from(10).pow(18 - decimals));
  }

  let approved =
    useTokenAllowance(
      chainId,
      depositInfo.token?.substring(4),
      currentAccount,
      chainData.bridgeAddress?.substring(4),
    ) ?? BigNumber.from(0);

  if (approved && decimals) {
    approved = approved.mul(BigNumber.from(10).pow(18 - decimals));
  }

  const actions = {
    useApproveAction: (): ((amount: BigNumber) => Promise<void>) => {
      try {
        const contract = depositInfo.token
          ? new Contract(depositInfo.token.substring(4), ERC20Interface)
          : undefined;

        const approve = useContractFunction(contract as any, 'approve');

        return (amount: BigNumber) =>
          approve.send(
            chainData.bridgeAddress?.substring(4),
            amount.div(BigNumber.from(10).pow(18 - decimals)),
          );
      } catch (_) {}

      return () => Promise.reject();
    },
    useDepositction: (): ((
      depositInfo: BridgeDepositInfo,
    ) => Promise<void>) => {
      try {
        const contract = chainData.nfpAddress
          ? new Contract(chainData.nfpAddress.substring(4), BridgeInterface)
          : undefined;

        const deposit = useContractFunction(contract as any, 'deposit');

        return (depositInfo: BridgeDepositInfo) =>
          deposit.send(
            [
              depositInfo.amount,
              depositInfo.chainTo,
              depositInfo.token?.substring(4),
              false,
              depositInfo.recipient,
              depositInfo.nfpId ?? 0,
            ],
            [
              chainGasPriceSig?.data?.tokenPriceSig?.tokenPrice ?? 0,
              chainGasPriceSig?.data?.tokenPriceSig?.validUntil ?? 0,
              chainGasPriceSig?.data?.tokenPriceSig?.sig ?? '-',
            ],
            [
              tokenPriceSig?.data?.tokenPriceSig?.tokenPrice ?? 0,
              tokenPriceSig?.data?.tokenPriceSig?.validUntil ?? 0,
              tokenPriceSig?.data?.tokenPriceSig?.sig ?? '-',
            ],
          );
      } catch (_) {}

      return () => Promise.reject();
    },
  };

  return {
    ...actions,
    chainGasPriceUsed: chainGasPriceSig?.data?.tokenPriceSig?.tokenPrice,
    tokenPriceUsed: tokenPriceSig?.data?.tokenPriceSig?.tokenPrice,
    minimum,
    tokenBalance: balance,
    tokenApproved: approved,
    nfps,
    tokensLastUsedAt,
    nfpsLastUsedAt,
    amountToRecieve,
    cost,
    expectedFee,
    fee,
    nfpUsed,
    tokensUsed,
    bridgeDepositFeeError,
  };
}

export default useBridge;
