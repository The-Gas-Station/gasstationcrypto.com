import { useEffect, useMemo } from 'react';
import {
  ChainCall,
  useChainStateContext,
} from '../providers/ChainStateProvider';
import { Falsy } from '../models/types';
import { ChainId } from '../constants/chains';
import { useWeb3ConnectionsContext } from '../providers/Web3ConnectionsProvider';

export function useChainCalls(
  chainId: ChainId | undefined,
  calls: (ChainCall | Falsy)[],
) {
  const { currentChainId } = useWeb3ConnectionsContext();
  const { dispatchCalls, state } = useChainStateContext();

  useEffect(() => {
    const filteredCalls = calls.filter(Boolean) as ChainCall[];
    dispatchCalls({
      type: 'ADD_CALLS',
      chainId: chainId ?? currentChainId,
      calls: filteredCalls,
    });
    return () =>
      dispatchCalls({
        type: 'REMOVE_CALLS',
        chainId: chainId ?? currentChainId,
        calls: filteredCalls,
      });
  }, [JSON.stringify(calls), dispatchCalls]);

  return useMemo(
    () =>
      calls.map(
        (call) =>
          call &&
          state &&
          state[chainId ?? currentChainId]?.state?.[call.address]?.[call.data],
      ),
    [JSON.stringify(calls), state],
  );
}

export default useChainCalls;

export function useChainCall(
  chainId: ChainId | undefined,
  call: ChainCall | Falsy,
) {
  return useChainCalls(chainId, [call])[0];
}
