import { useMemo } from 'react';
import { ChainId } from '../constants/chains';
import { BigNumber } from 'ethers';
import { CHAIN_INFO } from '../../configs';
import { useBurnedSupply } from './useBurnedSupply';
import useTokenPrice from '../../hooks/useTokenPrice'
export function useBurnedSupplyValue(chainId: ChainId): BigNumber {
  const gasBalance = useBurnedSupply(chainId);
  return useMemo(() => {
    return useTokenPrice(chainId, CHAIN_INFO[chainId].gasTokenAddress, gasBalance);
  }, [gasBalance]);
}
