import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';

import { ChainId } from '../library/constants/chains';
import { CHAIN_INFO, PoolType } from '../configs';

import usePoolDualV1 from './usePoolDualV1';
import usePoolSingleV1 from './usePoolSingleV1';
import usePoolSingleV2 from './usePoolSingleV2';

export function usePools(chainId: ChainId) {
  const { currentAccount } = useWeb3ConnectionsContext();
  const chainData = CHAIN_INFO[chainId];

  const pools = [];

  if (chainData.pools) {
    for (const pool of chainData.pools) {
      switch (pool.type) {
        case PoolType.DoubleV1:
          pools.push({
            ...pool,
            ...usePoolDualV1(
              chainId,
              pool.address.substring(4),
              currentAccount,
            ),
          });
          break;
        case PoolType.SingleV1:
          pools.push({
            ...pool,
            ...usePoolSingleV1(
              chainId,
              pool.address.substring(4),
              currentAccount,
            ),
          });
          break;
        case PoolType.SingleV2:
          pools.push({
            ...pool,
            ...usePoolSingleV2(
              chainId,
              pool.address.substring(4),
              currentAccount,
            ),
          });
          break;
      }
    }
  }

  return pools;
}

export default usePools;
