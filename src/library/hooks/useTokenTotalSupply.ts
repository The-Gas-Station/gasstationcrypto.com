import { BigNumber } from '@ethersproject/bignumber';
import { ERC20Interface } from '../constants/abi';
import { Falsy } from '../models/types';
import useContractCall from './useContractCall';
import { ChainId } from '../constants/chains';

export function useTokenTotalSupply(
  chainId: ChainId | undefined,
  tokenAddress: string | Falsy,
): BigNumber | undefined {
  const [totalSupply] =
    useContractCall(
      chainId,
      tokenAddress && {
        abi: ERC20Interface,
        address: tokenAddress,
        method: 'totalSupply',
        args: [],
      },
    ) ?? [];

  return totalSupply;
}

export default useTokenTotalSupply;
