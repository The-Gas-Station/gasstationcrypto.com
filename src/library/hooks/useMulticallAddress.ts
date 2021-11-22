import { useChainStateContext } from '../providers/ChainStateProvider';
import { ChainId } from '../constants/chains';
import { useWeb3ConnectionsContext } from '../providers/Web3ConnectionsProvider';

export function useMulticallAddress(
  chainId: ChainId | undefined,
): string | undefined {
  const { currentChainId } = useWeb3ConnectionsContext();
  return useChainStateContext().multicallAddresses[chainId ?? currentChainId];
}

export default useMulticallAddress;
