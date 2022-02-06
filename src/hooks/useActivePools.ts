import { useBlockNumber } from '../library/providers/BlockNumberProvider';
import { PoolData } from './Pools';
import usePools from './usePools';

import { ChainId } from '../library/constants/chains';

export function useActivePools(chainId: ChainId): PoolData[] {
  const activePools: PoolData[] = [];

  const blockNumber = useBlockNumber(chainId) ?? 0;
  const pools = usePools(chainId);

  activePools.push(
    ...pools.filter((pool) =>
      blockNumber && pool.usesBlocks
        ? pool.end >= blockNumber
        : pool.end * 1000 >= Date.now(),
    ),
  );

  return activePools;
}

export default useActivePools;
