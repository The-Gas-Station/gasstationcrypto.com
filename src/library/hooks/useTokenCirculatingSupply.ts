import { BigNumber } from '@ethersproject/bignumber';
import { ERC20Interface } from '../constants/abi';
import { Falsy } from '../models/types';
import useContractCall from './useContractCall';
import useTokenTotalSupply from './useTokenTotalSupply';
import useTokenBalance from './useTokenBalance';
import { ChainId } from '../constants/chains';

export function useTokenCirculatingSupply(
  chainId: ChainId | undefined,
  tokenAddress: string | Falsy,
  burnAddresses: string[] | Falsy,
): BigNumber | undefined {
  const totalSupply = useTokenTotalSupply(chainId, tokenAddress);

  const burnedSupply = burnAddresses
    ? burnAddresses.reduce(
        (prev, burnAddress) =>
          prev.add(
            useTokenBalance(chainId, tokenAddress, burnAddress) ??
              BigNumber.from(0),
          ),
        BigNumber.from(0),
      )
    : BigNumber.from(0);

  return totalSupply && burnedSupply
    ? totalSupply.sub(burnedSupply)
    : undefined;
}

export default useTokenCirculatingSupply;
