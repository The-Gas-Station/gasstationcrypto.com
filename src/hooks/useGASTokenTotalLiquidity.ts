import { useMemo } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import useLiquidityPairRatio from '../library/hooks/useLiquidityPairRatio';
import useTokenDecimals from '../library/hooks/useTokenDecimals';
import { ChainId, WRAPPED_ETHER_ADDRESSES } from '../library/constants/chains';
import BUFFER from '../library/constants/percisionBuffer';

import { CHAIN_INFO } from '../configs';

export function useGASTokenTotalLiquidity(chainId: ChainId): BigNumber {
  const chainData = CHAIN_INFO[chainId];

  const { ratio: etherRatio, token1 } = useLiquidityPairRatio(
    chainId,
    chainData.etherLiquidityPair?.substring(4),
    WRAPPED_ETHER_ADDRESSES[chainId],
  );

  const decimals = useTokenDecimals(chainId, token1);

  const data: {
    ratio: BigNumber | undefined;
    percent1: BigNumber | undefined;
    totalSupply: BigNumber | undefined;
  }[] = [];

  if (chainData.liquidityPairs) {
    for (const liquidityPair of chainData.liquidityPairs) {
      const { ratio, percent1, totalSupply } = useLiquidityPairRatio(
        chainId,
        liquidityPair.address.substring(4),
        chainData.gasTokenAddress?.substring(4),
      );

      data.push({ ratio, percent1, totalSupply });
    }
  }

  return useMemo(() => {
    return etherRatio && decimals
      ? data.reduce(
          (prev, { ratio, percent1, totalSupply }) =>
            prev.add(
              ratio && percent1 && totalSupply
                ? totalSupply
                    .mul(percent1)
                    .mul(etherRatio.mul(BigNumber.from(10).pow(18 - decimals)))
                    .div(BUFFER)
                    .div(BUFFER)
                : BigNumber.from('0'),
            ),
          BigNumber.from('0'),
        )
      : BigNumber.from('0');
  }, [etherRatio, decimals, ...data]);
}

export default useGASTokenTotalLiquidity;
