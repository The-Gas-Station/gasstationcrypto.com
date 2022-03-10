import { BigNumber } from '@ethersproject/bignumber';
import { ChainId } from "../constants/chains";
import { CHAIN_INFO } from '../../configs';
import { useMemo } from 'react';
import { useBurnedSupplyValue } from './useBurnedSupplyValue';

export function useTotalValueBurned(): BigNumber {
  const allChainsIds = Object.keys(CHAIN_INFO);
  const burnedBalances = allChainsIds.map((chainId) => useBurnedSupplyValue(Number(chainId)));
  return useMemo(() => {
    return burnedBalances.reduce(
      (prev, marketCap) => prev.add(marketCap),
      BigNumber.from(0),
    );
  }, [burnedBalances]);
}
