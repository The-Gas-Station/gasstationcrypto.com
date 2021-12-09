import { BigNumber } from '@ethersproject/bignumber';

import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';

import { ChainId, WRAPPED_ETHER_ADDRESSES } from '../library/constants/chains';
import { GASTokenInterface } from '../constants';
import { CHAIN_INFO } from '../configs';

import { useContractCalls } from '../library/hooks/useContractCall';
import useTokenBalance from '../library/hooks/useTokenBalance';
import useLiquidityPairRatio from '../library/hooks/useLiquidityPairRatio';
import useTokenDecimals from '../library/hooks/useTokenDecimals';

import BUFFER from '../library/constants/percisionBuffer';

export function useGASTokenRewardsInfo(chainId?: ChainId): {
  gasTokenBalance: BigNumber;
  accountRewards: BigNumber;
  totalRewards: BigNumber;
  gasTokenBalanceUSD: BigNumber;
} {
  const { currentChainId, currentAccount } = useWeb3ConnectionsContext();
  const chainData = CHAIN_INFO[chainId ?? currentChainId];

  const gasTokenAddress = chainData.gasTokenAddress?.substring(4);

  const gasTokenBalance =
    useTokenBalance(
      chainId ?? currentChainId,
      gasTokenAddress,
      currentAccount,
    ) ?? BigNumber.from(0);

  const [_totalRewards, _accountRewards] =
    useContractCalls(chainId, [
      gasTokenAddress && {
        abi: GASTokenInterface,
        address: gasTokenAddress,
        method: 'getTotalDividendsDistributed',
        args: [],
      },
      gasTokenAddress &&
        currentAccount && {
          abi: GASTokenInterface,
          address: gasTokenAddress,
          method: 'getAccountDividendsInfo',
          args: [currentAccount],
        },
    ]) ?? [];

  const [totalRewards, accountRewards] = [
    _totalRewards ? _totalRewards[0] : BigNumber.from(0),
    _accountRewards ? _accountRewards[4] : BigNumber.from(0),
  ];

  const { ratio: etherRatio, token1 } = useLiquidityPairRatio(
    chainId ?? currentChainId,
    chainData.etherLiquidityPair?.substring(4),
    WRAPPED_ETHER_ADDRESSES[chainId ?? currentChainId],
  );

  const decimals = useTokenDecimals(chainId ?? currentChainId, token1);

  const { ratio } = useLiquidityPairRatio(
    chainId ?? currentChainId,
    chainData.liquidityPairs && chainData.liquidityPairs.length > 0
      ? chainData.liquidityPairs[0].address.substring(4)
      : undefined,
    chainData.gasTokenAddress?.substring(4),
  );

  return {
    gasTokenBalance,
    accountRewards,
    totalRewards,
    gasTokenBalanceUSD:
      gasTokenBalance && etherRatio && decimals && ratio
        ? gasTokenBalance
            .mul(ratio)
            .mul(etherRatio.mul(BigNumber.from(10).pow(18 - decimals)))
            .div(BUFFER)
            .div(BUFFER)
        : BigNumber.from('0'),
  };
}

export default useGASTokenRewardsInfo;
