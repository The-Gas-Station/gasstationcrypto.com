import { useMemo } from 'react';
import { useBlockNumber } from '../library/providers/BlockNumberProvider';
import { useConfig } from '../library/providers/ConfigProvider';
import { PoolData } from './Pools';
import usePools from './usePools';

const poolIsActive = (pool: PoolData, currentBlock: number) => {
  const isFinished = pool.usesBlocks
    ? pool.end < currentBlock
    : pool.end * 1000 < Date.now();
  return !isFinished;
};

export function useActivePools(): PoolData[] {
  const { readOnlyChainIds: chainIds = [] } = useConfig();
  const blockNumbers: { [chainId: number]: number } = [];
  for (let index = 0; index < chainIds.length; index++) {
    const chainId = chainIds[index];
    const blockNumber = useBlockNumber(chainId) ?? 0;
    blockNumbers[chainId] = blockNumber;
  }
  const poolsByChain: { [chain: number]: PoolData[] } = {};
  for (let _index = 0; _index < chainIds.length; _index++) {
    const chainId = chainIds[_index];
    const pools = usePools(chainId);
    poolsByChain[chainId] = pools;
    const activePools: PoolData[] = [];
    for (let index = 0; index < pools.length; index++) {
      const pool = pools[index];
      const activePool = poolIsActive(pool, blockNumbers[chainId]);
      activePool && activePools.push(pool);
    }
    poolsByChain[chainId] = activePools;
  }
  return useMemo(() => {
    return Object.values(poolsByChain).flat(2);
  }, [...chainIds, JSON.stringify(blockNumbers), JSON.stringify(poolsByChain)]);
}

export default useActivePools;
