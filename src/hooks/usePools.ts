import { Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';

import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';

import { ChainId } from '../library/constants/chains';
import { CHAIN_INFO, PoolType } from '../configs';
import { ERC20Interface } from '../library/constants/abi';

import usePoolDualV1 from './usePoolDualV1';
import usePoolSingleV1 from './usePoolSingleV1';
import usePoolSingleV2 from './usePoolSingleV2';
import useContractFunction from '../library/hooks/useContractFunction';

import { PoolResult, PoolData } from './Pools';

export function usePools(chainId: ChainId): PoolResult[] {
  const { currentAccount } = useWeb3ConnectionsContext();
  const chainData = CHAIN_INFO[chainId];

  const pools = [];

  const actions = {
    useApproveAction: (pool: PoolData) => {
      const contract = pool.stakeToken.address
        ? new Contract(pool.stakeToken.address, ERC20Interface)
        : new Contract(pool.address, pool.interface);

      const approve = useContractFunction(contract, 'approve');

      return (amount: BigNumber) => approve.send(pool.address, amount);
    },
    useDepositAction: (pool: PoolData) => {
      const contract = new Contract(pool.address, pool.interface);

      const deposit = useContractFunction(contract, 'deposit');

      return (amount: BigNumber) =>
        deposit.send(
          amount.div(BigNumber.from(10).pow(18 - pool.stakeToken.decimals)),
        );
    },
    useHarvestAction: (pool: PoolData) => {
      const contract = new Contract(pool.address, pool.interface);

      const deposit = useContractFunction(contract, 'deposit');

      return () => deposit.send(0);
    },
    useWithdrawAction: (pool: PoolData) => {
      const contract = new Contract(pool.address, pool.interface);

      const withdraw = useContractFunction(contract, 'withdraw');

      return (amount: BigNumber) =>
        withdraw.send(
          amount.div(BigNumber.from(10).pow(18 - pool.stakeToken.decimals)),
        );
    },
  };

  if (chainData.pools) {
    for (const pool of chainData.pools) {
      switch (pool.type) {
        case PoolType.DoubleV1:
          pools.push({
            ...pool,
            address: pool.address.substring(4),
            ...actions,
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
            address: pool.address.substring(4),
            ...actions,
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
            address: pool.address.substring(4),
            ...actions,
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
