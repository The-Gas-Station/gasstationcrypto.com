import { BigNumber } from '@ethersproject/bignumber';
import { ERC20Interface } from '../constants/abi';
import { Falsy } from '../models/types';
import useContractCall from './useContractCall';
import { ChainId } from '../constants/chains';

export function useTokenBalance(
  chainId: ChainId | undefined,
  tokenAddress: string | Falsy,
  address: string | Falsy,
): BigNumber | undefined {
  const [tokenBalance] =
    useContractCall(
      chainId,
      address &&
        tokenAddress && {
          abi: ERC20Interface,
          address: tokenAddress,
          method: 'balanceOf',
          args: [address],
        },
    ) ?? [];
  return tokenBalance;
}
