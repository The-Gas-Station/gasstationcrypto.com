import { ethers } from 'ethers';

import useDebounce from '../../library/hooks/useDebounce';
import useTotalUSDRewards from '../../hooks/useTotalUSDRewards';

import numeral from 'numeral';

const TotalRewardsUSD = () => {
  const totalRewardsCalc = useTotalUSDRewards();

  const debouncedTotalRewardsCalc = useDebounce(totalRewardsCalc, 50);

  return (
    <p>
      Over{' '}
      {numeral(ethers.utils.formatEther(debouncedTotalRewardsCalc)).format(
        '$0,0.00',
      )}
      + in GAS Rewards across all networks
    </p>
  );
};

export default TotalRewardsUSD;
