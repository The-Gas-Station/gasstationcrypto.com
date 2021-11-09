import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from 'react';
import useEthers from '../hooks/useEthers';
import useDebounce from '../hooks/useDebounce';
// import useDebouncePair from '../hooks/useDebouncePair';
import { useBlockNumber } from './BlockNumberProvider';
import { useConfig } from './ConfigProvider';
import { multicall } from '../helpers/multicall';
import { notifyDevtools } from '../devtools';
import { useDevtoolsReporting } from '../hooks/useDevtoolsReporting';
import { ChainId, CHAIN_NAMES } from '../constants/chains';
import { Web3Provider } from '@ethersproject/providers';

export type ChainState = {
  [address: string]:
    | {
        [data: string]: string | undefined;
      }
    | undefined;
};

export type Action = AddCall | RemoveCall;

export interface ChainCall {
  address: string;
  data: string;
}

interface AddCall {
  type: 'ADD_CALLS';
  chainId: ChainId;
  calls: ChainCall[];
}

interface RemoveCall {
  type: 'REMOVE_CALLS';
  chainId: ChainId;
  calls: ChainCall[];
}

export interface State {
  [chainId: number]:
    | {
        blockNumber: number;
        state?: ChainState;
        error?: unknown;
      }
    | undefined;
}

interface ChainStateProviderProps {
  children: ReactNode;
  multicallAddresses: {
    [chainId: number]: string;
  };
}

function callsReducer(
  state: { [chainId: number]: ChainCall[] } = {},
  action: Action,
) {
  let chainState = state[action.chainId] ?? [];
  if (action.type === 'ADD_CALLS') {
    return {
      ...state,
      [action.chainId]: [...chainState, ...action.calls],
    };
  } else {
    for (const call of action.calls) {
      const index = chainState.findIndex(
        (x) => x.address === call.address && x.data === call.data,
      );
      if (index !== -1) {
        chainState = chainState.filter((_, i) => i !== index);
      }
    }
    return { ...state, [action.chainId]: chainState };
  }
}

const context = createContext<{
  state?: State;
  multicallAddresses: {
    [chainId: number]: string;
  };
  dispatchCalls: (action: Action) => void;
}>({
  multicallAddresses: {},
  dispatchCalls: () => {
    // empty
  },
});

export function ChainStateProvider({
  children,
  multicallAddresses,
}: ChainStateProviderProps) {
  const { library: mainLibrary, chainId } = useEthers();
  const [calls, dispatchCalls] = useReducer(callsReducer, {});
  const [state, setState] = useState<State>({});

  const { readOnlyChainIds } = useConfig();

  const debouncedCalls = useDebounce(calls, 50);
  const uniqueCalls = getUnique(debouncedCalls);

  if (readOnlyChainIds) {
    for (const readOnlyChainId of readOnlyChainIds) {
      const multicallData: {
        blockNumber?: number;
        library?: Web3Provider;
        multicallAddress?: string;
        chainId?: ChainId;
        uniqueCallsJSON?: string;
      } = {};

      try {
        multicallData.blockNumber = useBlockNumber(readOnlyChainId);

        const { library: connectedLibrary, chainId: connectedChainId } =
          useEthers(CHAIN_NAMES[readOnlyChainId]);

        multicallData.chainId = connectedChainId;

        multicallData.multicallAddress =
          connectedChainId !== undefined
            ? multicallAddresses[connectedChainId]
            : undefined;

        multicallData.library =
          chainId == connectedChainId ? mainLibrary : connectedLibrary;
      } catch (_) {}

      // used for deep equality in hook dependencies
      multicallData.uniqueCallsJSON = multicallData.chainId
        ? JSON.stringify(uniqueCalls[multicallData.chainId])
        : '';

      useDevtoolsReporting(
        multicallData.uniqueCallsJSON,
        multicallData.chainId ? uniqueCalls[multicallData.chainId] : [],
        multicallData.blockNumber,
        multicallAddresses,
      );

      useEffect(() => {
        if (
          multicallData.library &&
          multicallData.blockNumber !== undefined &&
          multicallData.chainId !== undefined
        ) {
          if (!multicallData.multicallAddress) {
            console.error(
              `Missing multicall address for chain id ${multicallData.chainId}`,
            );
            return;
          }
          const library = multicallData.library;
          const multicallAddress = multicallData.multicallAddress;
          const blockNumber = multicallData.blockNumber;
          const chainId = multicallData.chainId;

          const start = Date.now();

          multicall(
            library,
            multicallAddress,
            blockNumber,
            uniqueCalls[chainId],
          )
            .then((state) => {
              setState((draft: State) => {
                const current = draft[chainId]?.blockNumber;

                if (blockNumber === current) {
                  // merge with existing state to prevent requests coming out of order
                  // from overwriting the data
                  const oldState = draft[chainId]?.state ?? {};
                  for (const [address, entries] of Object.entries(oldState)) {
                    state = {
                      ...state,
                      [address]: {
                        ...entries,
                        ...state[address],
                      },
                    };
                  }
                }

                return {
                  ...draft,
                  [chainId]: {
                    blockNumber: blockNumber,
                    state,
                  },
                };
              });
              notifyDevtools({
                type: 'MULTICALL_SUCCESS',
                duration: Date.now() - start,
                chainId,
                blockNumber,
                multicallAddress,
                state,
              });
            })
            .catch((error) => {
              console.error(error);
              setState((draft: State) => {
                return {
                  ...draft,
                  [chainId]: {
                    ...draft[chainId],
                    blockNumber,
                    error,
                  },
                };
              });
              notifyDevtools({
                type: 'MULTICALL_ERROR',
                duration: Date.now() - start,
                chainId,
                blockNumber,
                multicallAddress,
                calls: uniqueCalls[chainId],
                error,
              });
            });
        }
      }, [
        multicallData.library,
        multicallData.blockNumber,
        multicallData.chainId,
        multicallData.multicallAddress,
        multicallData.uniqueCallsJSON,
      ]);
    }
  }

  const provided = { state, multicallAddresses, dispatchCalls };

  return <context.Provider value={provided}>{children}</context.Provider>;
}

export default ChainStateProvider;

export const useChainStateContext = () => useContext(context);

function getUnique(requests: { [chainId: number]: ChainCall[] }) {
  const result: { [chain: number]: ChainCall[] } = {};

  for (const chain in requests) {
    const unique: ChainCall[] = [];
    for (const request of requests[chain]) {
      if (
        !unique.find(
          (x) => x.address === request.address && x.data === request.data,
        )
      ) {
        unique.push(request);
      }
    }
    result[chain] = unique;
  }

  return result;
}
