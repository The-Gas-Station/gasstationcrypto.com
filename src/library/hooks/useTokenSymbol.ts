import { ERC20Interface } from '../constants/abi';
import { Falsy } from '../models/types';
import useContractCall from './useContractCall';
import { ChainId } from '../constants/chains';

export function useTokenSymbol(
  chainId: ChainId | undefined,
  tokenAddress: string | Falsy,
): string | undefined {
  const [symbol] =
    useContractCall(
      chainId,
      tokenAddress && {
        abi: ERC20Interface,
        address: tokenAddress,
        method: 'symbol',
        args: [],
      },
    ) ?? [];

  return symbol;
}

export default useTokenSymbol;
