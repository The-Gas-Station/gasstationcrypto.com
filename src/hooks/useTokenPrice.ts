import { useMemo } from 'react';
import { BigNumber } from '@ethersproject/bignumber';

import useLiquidityPairRatio from '../library/hooks/useLiquidityPairRatio';
import useGASTokenPrice from './useGASTokenPrice';
import useTokenDecimals from '../library/hooks/useTokenDecimals';

import { ChainId, WRAPPED_ETHER_ADDRESSES } from '../library/constants/chains';
import BUFFER from '../library/constants/percisionBuffer';

import { CHAIN_INFO } from '../configs';

export function useTokenPrice(
  chainId: ChainId,
  tokenAddress?: string,
  amount?: BigNumber,
): BigNumber {
  const chainData = CHAIN_INFO[chainId];

  const { ratio: etherRatio, token1 } = useLiquidityPairRatio(
    chainId,
    chainData.etherLiquidityPair?.substring(4),
    WRAPPED_ETHER_ADDRESSES[chainId],
  );

  const decimals = useTokenDecimals(chainId, token1);

  const gasTokenPrice = useGASTokenPrice(chainId);

  const { percent1 } = useLiquidityPairRatio(
    chainId,
    tokenAddress,
    chainData.gasTokenAddress?.substring(4),
    false,
  );

  let lookupPercent1: BigNumber | undefined;

  if (chainData.lookupLiquidityPairs) {
    const liquidityPairRatioResults = chainData.lookupLiquidityPairs
      .map((lookup) =>
        useLiquidityPairRatio(
          chainId,
          lookup.address?.substring(4),
          WRAPPED_ETHER_ADDRESSES[chainId],
          false,
        ),
      )
      .find(
        (liquidityPairRatioResults) =>
          liquidityPairRatioResults.token1 == tokenAddress,
      );

    lookupPercent1 = liquidityPairRatioResults?.percent1;
  }

  return useMemo(() => {
    if (
      tokenAddress?.toLowerCase() ==
      WRAPPED_ETHER_ADDRESSES[chainId].toLowerCase()
    ) {
      return amount && etherRatio && decimals
        ? amount
            .mul(etherRatio.mul(BigNumber.from(10).pow(18 - decimals)))
            .div(BUFFER)
        : BigNumber.from(0);
    }

    if (tokenAddress?.toLowerCase() == token1?.toLowerCase()) {
      return amount ? amount : BigNumber.from(0);
    }

    if (
      tokenAddress?.toLowerCase() ==
      chainData.gasTokenAddress?.substring(4).toLowerCase()
    ) {
      return amount
        ? amount.mul(gasTokenPrice).div(BigNumber.from(10).pow(18))
        : BigNumber.from(0);
    }

    if (lookupPercent1) {
      return amount && etherRatio && decimals && lookupPercent1
        ? amount
            .mul(lookupPercent1)
            .mul(etherRatio.mul(BigNumber.from(10).pow(18 - decimals)))
            .mul(2)
            .div(BUFFER)
            .div(BUFFER)
        : BigNumber.from('0');
    }

    return amount && etherRatio && decimals && percent1
      ? amount
          .mul(percent1)
          .mul(etherRatio.mul(BigNumber.from(10).pow(18 - decimals)))
          .mul(2)
          .div(BUFFER)
          .div(BUFFER)
      : BigNumber.from('0');
  }, [
    tokenAddress,
    amount,
    etherRatio,
    decimals,
    token1,
    gasTokenPrice,
    percent1,
    lookupPercent1,
  ]);
}

export default useTokenPrice;
