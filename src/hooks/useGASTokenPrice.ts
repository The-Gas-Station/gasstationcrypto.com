import { useMemo } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import useLiquidityPairRatio from '../library/hooks/useLiquidityPairRatio';
import useTokenDecimals from '../library/hooks/useTokenDecimals';
import { ChainId, WRAPPED_ETHER_ADDRESSES } from '../library/constants/chains';
import BUFFER, { PERCISION } from '../library/constants/percisionBuffer';

import { CHAIN_INFO } from '../configs';

export function useGASTokenPrice(chainId: ChainId): BigNumber {
  const chainData = CHAIN_INFO[chainId];

  const { ratio: etherRatio, token1 } = useLiquidityPairRatio(
    chainId,
    chainData.etherLiquidityPair?.substring(4),
    WRAPPED_ETHER_ADDRESSES[chainId],
  );

  const decimals = useTokenDecimals(chainId, token1);

  const { ratio } = useLiquidityPairRatio(
    chainId,
    chainData.liquidityPairs && chainData.liquidityPairs.length > 0
      ? chainData.liquidityPairs[0].address.substring(4)
      : undefined,
    chainData.gasTokenAddress?.substring(4),
  );

  return useMemo(() => {
    return etherRatio && decimals && ratio
      ? ratio
          .mul(etherRatio.mul(BigNumber.from(10).pow(18 - decimals)))
          .div(BUFFER)
          .div(BigNumber.from(10).pow(PERCISION - 18))
      : BigNumber.from('0');
  }, [etherRatio, decimals, ratio]);
}

export default useGASTokenPrice;
