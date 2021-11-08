import { MultiCallABI } from '../constants/abi';
import { useMulticallAddress } from './useMulticallAddress';
import { Falsy } from '../models/types';
import useContractCall from './useContractCall';
import { BigNumber } from '@ethersproject/bignumber';
import { ChainId } from '../constants/chains';

export function useEtherBalance(
  chainId: ChainId | undefined,
  address: string | Falsy,
): BigNumber | undefined {
  const multicallAddress = useMulticallAddress(chainId);
  const [etherBalance] =
    useContractCall(
      chainId,
      multicallAddress &&
        address && {
          abi: MultiCallABI,
          address: multicallAddress,
          method: 'getEthBalance',
          args: [address],
        },
    ) ?? [];
  return etherBalance;
}

export default useEtherBalance;
