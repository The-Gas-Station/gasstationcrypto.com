import React, { useEffect, useState } from 'react';
import BannerImg from '../../assets/banner-img.png';

import { useConfig } from '../../library/providers/ConfigProvider';
import numeral from 'numeral';
import useGASTokenRewardsInfo from '../../hooks/useGASTokenRewardsInfo';
import { BigNumber, ethers } from 'ethers';
import { ChainId } from '../../library/constants/chains';
import HigestAPR from './HighestAPR';

const getAllChainsTotalRewardsUSD = (chains: ChainId[]) => {
  const rewardsPerChain = chains.map((chainA) => {
    const { totalRewardsUSD } = useGASTokenRewardsInfo(chainA);
    return totalRewardsUSD;
  });
  return rewardsPerChain.reduce((rewardA, rewardB) => {
    return rewardA.add(rewardB);
  });
};

const formatEther = (ether: BigNumber) =>
  numeral(ethers.utils.formatEther(ether)).format('$0,0.00');

const BannerSection = () => {
  const { readOnlyChainIds: chainIds = [] } = useConfig();

  const totalRewardsStr = chainIds
    .map((chainId) => {
      const { totalRewards } = useGASTokenRewardsInfo(chainId);
      return totalRewards;
    })
    .map((reward) => formatEther(reward));

  const allRewardsUSD = getAllChainsTotalRewardsUSD(chainIds);

  const [totalUSDRewards, setTotalUSDRewards] = useState<BigNumber | null>(
    null,
  );

  useEffect(() => {
    setTotalUSDRewards(allRewardsUSD);
  }, [JSON.stringify(totalRewardsStr)]);

  const validTotalUSDRewards = totalUSDRewards !== null;
  const TotalRewardsUSDBanner = validTotalUSDRewards ? (
    <p>Over {formatEther(totalUSDRewards)} + in GAS Rewards</p>
  ) : null;
  return (
    <>
      <div className={`banner-section-wrapper`}>
        <div className={`banner-section`}>
          <div className="col-md-6">
            <div className="banner-text">
              <h5 className="text-white">
                We're building the multi-chain crypto bridge so you can swap
                between major crypto networks.
              </h5>
              <p className="text-green">
                <strong>Invest in the project today</strong>
              </p>
              <HigestAPR />
              {TotalRewardsUSDBanner}
              <p className="text-green">
                <strong>Fuel your Tank today!</strong>
              </p>
            </div>
            <div className="banner-img d-block d-md-none">
              <img src={BannerImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerSection;
