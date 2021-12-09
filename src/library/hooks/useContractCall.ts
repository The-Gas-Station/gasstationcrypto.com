import { Interface } from '@ethersproject/abi';
import { useMemo } from 'react';
import { Falsy } from '../models/types';
import { useChainCalls } from './useChainCalls';
import { ChainCall } from '../providers/ChainStateProvider';
import { ChainId } from '../constants/chains';

function warnOnInvalidContractCall(call: ContractCall | Falsy) {
  console.warn(
    `Invalid contract call: address=${call && call.address} method=${
      call && call.method
    } args=${call && call.args}`,
  );
}

function encodeCallData(call: ContractCall | Falsy): ChainCall | Falsy {
  try {
    return (
      call && {
        address: call.address,
        data: call.abi.encodeFunctionData(call.method, call.args),
      }
    );
  } catch {
    warnOnInvalidContractCall(call);
    return undefined;
  }
}

export interface ContractCall {
  abi: Interface;
  address: string;
  method: string;
  args: any[];
}

export function useContractCall(
  chainId: ChainId | undefined,
  call: ContractCall | Falsy,
  throwWarning = true,
): any[] | undefined {
  return useContractCalls(chainId, [call], throwWarning)[0];
}

export default useContractCall;

export function useContractCalls(
  chainId: ChainId | undefined,
  calls: (ContractCall | Falsy)[],
  throwWarning = true,
): (any[] | undefined)[] {
  const results = useChainCalls(chainId, calls.map(encodeCallData));

  return useMemo(
    () =>
      results.map((result, idx) => {
        const call = calls[idx];
        if (result === '0x') {
          if (throwWarning) {
            warnOnInvalidContractCall(call);
          }
          return undefined;
        }
        return call && result
          ? (call.abi.decodeFunctionResult(call.method, result) as any[])
          : undefined;
      }),
    [results],
  );
}
