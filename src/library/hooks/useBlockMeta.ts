import { MultiCallABI } from '../constants/abi';
import { BigNumber } from '@ethersproject/bignumber';
import { useChainCall } from './useChainCalls';
import useMulticallAddress from './useMulticallAddress';
import { ChainId } from '../constants/chains';

const GET_CURRENT_BLOCK_TIMESTAMP_CALL = MultiCallABI.encodeFunctionData(
  'getCurrentBlockTimestamp',
  [],
);
const GET_CURRENT_BLOCK_DIFFICULTY_CALL = MultiCallABI.encodeFunctionData(
  'getCurrentBlockDifficulty',
  [],
);

export function useBlockMeta(chainId: ChainId | undefined) {
  const address = useMulticallAddress(chainId);
  const timestamp = useChainCall(
    chainId,
    address && { address, data: GET_CURRENT_BLOCK_TIMESTAMP_CALL },
  );
  const difficulty = useChainCall(
    chainId,
    address && { address, data: GET_CURRENT_BLOCK_DIFFICULTY_CALL },
  );

  return {
    timestamp:
      timestamp !== undefined
        ? new Date(BigNumber.from(timestamp).mul(1000).toNumber())
        : undefined,
    difficulty:
      difficulty !== undefined ? BigNumber.from(difficulty) : undefined,
  };
}
