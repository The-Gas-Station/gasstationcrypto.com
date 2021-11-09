import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Web3Provider } from '@ethersproject/providers';
import useDebounce from '../hooks/useDebounce';
import useEthers from '../hooks/useEthers';
import { useConfig } from './ConfigProvider';
import { ChainId, CHAIN_NAMES } from '../constants/chains';

interface BlockNumberState {
  [chainId: number]: number | undefined;
}

interface BlockNumberProviderProps {
  children: ReactNode;
}

const context = createContext<{
  blockNumber: number | undefined;
  blockNumberState: BlockNumberState;
}>({ blockNumber: undefined, blockNumberState: {} });

export function BlockNumberProvider({ children }: BlockNumberProviderProps) {
  const { library, chainId } = useEthers();
  const { readOnlyChainIds } = useConfig();

  const [state, setState] = useState<BlockNumberState>({});

  useEffect(() => {
    if (library && chainId !== undefined) {
      const update = (blockNumber: number) =>
        setState((draft: BlockNumberState) => {
          return {
            ...draft,
            [chainId]: blockNumber,
          };
        });
      library.on('block', update);
      return () => {
        library.off('block', update);
      };
    }
  }, [library, chainId]);

  if (readOnlyChainIds) {
    for (const readOnlyChainId of readOnlyChainIds) {
      const blockData: {
        library?: Web3Provider;
        chainId?: ChainId;
      } = {};
      try {
        const { library, chainId } = useEthers(CHAIN_NAMES[readOnlyChainId]);
        blockData.library = library;
        blockData.chainId = chainId;
      } catch (_) {}

      useEffect(() => {
        if (blockData.library && blockData.chainId !== undefined) {
          const update = (blockNumber: number) =>
            setState((draft: BlockNumberState) => {
              return {
                ...draft,
                [blockData.chainId ?? 0]: blockNumber,
              };
            });
          blockData.library.on('block', update);
          return () => {
            blockData.library && blockData.library.off('block', update);
          };
        }
      }, [blockData.library, blockData.chainId]);
    }
  }

  const debouncedState = useDebounce(state, 100);
  const blockNumber =
    chainId !== undefined ? debouncedState[chainId] : undefined;

  return (
    <context.Provider value={{ blockNumber, blockNumberState: debouncedState }}>
      {children}
    </context.Provider>
  );
}

export default BlockNumberProvider;

export const useBlockNumber = (chainId?: ChainId) => {
  const blockNumberContext = useContext(context);
  return chainId
    ? blockNumberContext.blockNumberState[chainId]
    : blockNumberContext.blockNumber;
};
