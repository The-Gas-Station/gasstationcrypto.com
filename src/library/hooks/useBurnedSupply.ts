import { useMemo } from 'react';
import { ChainId } from '../constants/chains';
import { BigNumber } from 'ethers';
import { CHAIN_INFO } from '../../configs';
import useTokenBalance from './useTokenBalance';
export function useBurnedSupply(chainId: ChainId): BigNumber {
  const chainData = CHAIN_INFO[chainId];
  const { gasTokenAddress } = chainData;
  console.log(gasTokenAddress)
  const deadAddress = '0x000000000000000000000000000000000000dead';
  const zeroAddress = '0x0000000000000000000000000000000000000000';
  
  return useMemo(() => {
    const deadBalance = useTokenBalance(
      chainId, gasTokenAddress?.substring(4), deadAddress
    ) || BigNumber.from(0);
    const zeroBalance = useTokenBalance(
      chainId, gasTokenAddress?.substring(4), zeroAddress
    ) || BigNumber.from(0);
    return deadBalance.add(zeroBalance);
  }, []);
}
