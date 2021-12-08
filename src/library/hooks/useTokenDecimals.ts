import { ERC20Interface } from '../constants/abi';
import { Falsy } from '../models/types';
import useContractCall from './useContractCall';
import { ChainId } from '../constants/chains';

export function useTokenDecimals(
  chainId: ChainId | undefined,
  tokenAddress: string | Falsy,
): number | undefined {
  const [decimals] =
    useContractCall(
      chainId,
      tokenAddress && {
        abi: ERC20Interface,
        address: tokenAddress,
        method: 'decimals',
        args: [],
      },
    ) ?? [];

  return decimals;
}

export default useTokenDecimals;
