import { useMemo } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { useConfig } from '../library/providers/ConfigProvider';
import { useGASTokenRewardsInfo } from './useGASTokenRewardsInfo';

export function useTotalUSDRewards(): BigNumber {
  const { readOnlyChainIds = [] } = useConfig();
  const totalRewards: BigNumber[] = [];

  for (const chainId of readOnlyChainIds) {
    const { totalRewardsUSD } = useGASTokenRewardsInfo(chainId);

    totalRewards.push(totalRewardsUSD);
  }

  return useMemo(() => {
    return totalRewards.reduce((rewardA, rewardB) => {
      return rewardA.add(rewardB);
    }, BigNumber.from(0));
  }, [...totalRewards]);
}

export default useTotalUSDRewards;
