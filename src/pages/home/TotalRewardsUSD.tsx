import numeral from 'numeral';
import { formatEther } from 'ethers/lib/utils';
import { useTotalUSDRewards } from '../../hooks/useGASTokenRewardsInfo';
import React, { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

const formatRewards = (amount: BigNumber) =>
  numeral(formatEther(amount)).format('$0,0.00');

const TotalRewardsUSD = () => {
  const totalRewardsCalc = useTotalUSDRewards();
  const [totalUSDRewards, setTotalUSDRewards] = useState('');

  useEffect(() => {
    setTotalUSDRewards(formatRewards(totalRewardsCalc));
  }, [totalRewardsCalc]);

  return <p>Over {totalUSDRewards} + in GAS Rewards</p>;
};

export default TotalRewardsUSD;
