import { useMemo } from 'react';
import { BigNumber } from '@ethersproject/bignumber';

import { useConfig } from '../library/providers/ConfigProvider';
import useGASTokenMarketCap from './useGASTokenMarketCap';

export function useGASTokenCombinedMarketCap(): BigNumber {
  const { readOnlyChainIds } = useConfig();

  const marketCaps: BigNumber[] = [];

  if (readOnlyChainIds) {
    for (const chainId of readOnlyChainIds) {
      const marketCap = useGASTokenMarketCap(chainId);

      marketCaps.push(marketCap);
    }
  }

  return useMemo(() => {
    return marketCaps.reduce(
      (prev, marketCap) => prev.add(marketCap),
      BigNumber.from(0),
    );
  }, [...marketCaps]);
}

export default useGASTokenCombinedMarketCap;
