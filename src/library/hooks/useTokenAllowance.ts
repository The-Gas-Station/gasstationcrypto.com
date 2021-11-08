import { BigNumber } from '@ethersproject/bignumber';
import { ERC20Interface } from '../constants/abi';
import { Falsy } from '../models/types';
import useContractCall from './useContractCall';
import { ChainId } from '../constants/chains';

export function useTokenAllowance(
  chainId: ChainId | undefined,
  tokenAddress: string | Falsy,
  ownerAddress: string | Falsy,
  spenderAddress: string | Falsy,
): BigNumber | undefined {
  const [allowance] =
    useContractCall(
      chainId,
      ownerAddress &&
        spenderAddress &&
        tokenAddress && {
          abi: ERC20Interface,
          address: tokenAddress,
          method: 'allowance',
          args: [ownerAddress, spenderAddress],
        },
    ) ?? [];
  return allowance;
}
