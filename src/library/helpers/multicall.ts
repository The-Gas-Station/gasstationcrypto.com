import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';
import { ChainState, ChainCall } from '../providers/ChainStateProvider';

const ABI = [
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'requireSuccess',
        type: 'bool',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall2.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall2.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export async function multicall(
  provider: Provider,
  address: string,
  blockNumber: number,
  requests: ChainCall[],
): Promise<ChainState> {
  if (!requests || requests.length === 0) {
    return {};
  }
  const contract = new Contract(address, ABI, provider);
  const results = await contract.tryAggregate(
    false,
    requests.map(({ address, data }) => [address, data]),
    { blockTag: blockNumber },
  );

  const state: ChainState = {};
  for (let i = 0; i < requests.length; i++) {
    const { address, data } = requests[i];
    const result = results[i];
    const stateForAddress = state[address] ?? {};
    stateForAddress[data] = results[0] ? result[1] : undefined;
    state[address] = stateForAddress;
  }
  return state;
}
