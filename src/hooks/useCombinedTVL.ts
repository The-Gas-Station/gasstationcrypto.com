import { useMemo } from 'react';
import { BigNumber } from '@ethersproject/bignumber';

import { useConfig } from '../library/providers/ConfigProvider';
import useTVL from './useTVL';

export function useCombinedTVL(): BigNumber {
  const { readOnlyChainIds = [] } = useConfig();

  const tvls: BigNumber[] = [];

  for (const chainId of readOnlyChainIds) {
    const tvl = useTVL(chainId);

    tvls.push(tvl);
  }

  return useMemo(() => {
    return tvls.reduce((prev, tvl) => prev.add(tvl), BigNumber.from(0));
  }, [...tvls, ...readOnlyChainIds]);
}

export default useCombinedTVL;
