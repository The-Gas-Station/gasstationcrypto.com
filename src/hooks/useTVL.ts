import { useMemo } from 'react';
import { BigNumber } from '@ethersproject/bignumber';

import { useContractCalls } from '../library/hooks/useContractCall';

import { ChainId } from '../library/constants/chains';
import useTokenDecimals from '../library/hooks/useTokenDecimals';
import useTokenPrice from './useTokenPrice';

import { CHAIN_INFO } from '../configs';
import { PoolSingleV1Interface } from '../constants';

export function useTVL(chainId: ChainId) {
  const chainData = CHAIN_INFO[chainId];

  const totalStakeUSDs: BigNumber[] = [];

  if (chainData.pools) {
    const stakeTokens = (
      useContractCalls(chainId, [
        ...chainData.pools.map((pool) => ({
          abi: PoolSingleV1Interface,
          address: pool.address.substring(4),
          method: 'STAKE_TOKEN',
          args: [],
        })),
      ]) ?? []
    ).map((stakeToken) => (stakeToken ? stakeToken[0] : undefined));

    let totalStakes = (
      useContractCalls(chainId, [
        ...chainData.pools.map((pool) => ({
          abi: PoolSingleV1Interface,
          address: pool.address.substring(4),
          method: 'totalStaked',
          args: [],
        })),
      ]) ?? []
    ).map(
      (totalStake) =>
        (totalStake ? totalStake[0] : undefined) ?? BigNumber.from(0),
    );

    const stakeDecimals = stakeTokens.map(
      (stakeToken) => useTokenDecimals(chainId, stakeToken) ?? 18,
    );

    totalStakes = totalStakes.map((totalStake, i) =>
      totalStake && stakeDecimals[i]
        ? totalStake.mul(BigNumber.from(10).pow(18 - stakeDecimals[i]))
        : totalStake,
    );

    totalStakeUSDs.push(
      ...stakeTokens.map((stakeToken, i) =>
        useTokenPrice(chainId, stakeToken, totalStakes[i]),
      ),
    );
  }

  return useMemo(() => {
    return totalStakeUSDs.reduce(
      (prev, totalStakeUSD) => prev.add(totalStakeUSD),
      BigNumber.from(0),
    );
  }, [...totalStakeUSDs]);
}

export default useTVL;
