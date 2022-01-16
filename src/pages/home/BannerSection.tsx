import React, { useEffect, useState } from 'react';
import BannerImg from '../../assets/banner-img.png';

import { useConfig } from '../../library/providers/ConfigProvider';
import usePools from '../../hooks/usePools';
import numeral from 'numeral';
import { useBlockNumber } from '../../library/providers/BlockNumberProvider';
import useGASTokenRewardsInfo from '../../hooks/useGASTokenRewardsInfo';
import { BigNumber, ethers } from 'ethers';
import { ChainId } from '../../library/constants/chains';

const getHighestRewardAPR = (aprs: number[]) => {
  const highestAPRs = aprs.sort((a, b) => b - a);
  return highestAPRs?.shift() || 0;
};

const getAllChainsTotalRewardsUSD = (chains: ChainId[]) => {
  const rewardsPerChain = chains.map((chainA) => {
    const { totalRewardsUSD } = useGASTokenRewardsInfo(chainA);
    return totalRewardsUSD;
  });
  return rewardsPerChain.reduce((rewardA, rewardB) => {
    return rewardA.add(rewardB);
  });
};

const formatAPR = (apr: number): string => numeral(apr).format('0.00%');

const formatEther = (ether: BigNumber) =>
  numeral(ethers.utils.formatEther(ether)).format('$0,0.00');

const BannerSection = () => {
  const { readOnlyChainIds: chainIds = [] } = useConfig();
  const allAPRs = chainIds
    .map((chainId) => {
      const pools = usePools(chainId);
      const currentBlock = useBlockNumber(chainId) ?? 0;
      const activePools = pools.filter((p) => {
        const isFinished = p.usesBlocks
          ? p.end < currentBlock
          : p.end * 1000 < Date.now();
        return !isFinished;
      });
      return activePools.map((p) => p.apr);
    })
    .flat(2);

  const totalRewardsStr = chainIds
    .map((chainId) => {
      const { totalRewards } = useGASTokenRewardsInfo(chainId);
      return totalRewards;
    })
    .map((reward) => formatEther(reward));

  const allRewardsUSD = getAllChainsTotalRewardsUSD(chainIds);

  const [highestAPR, setHighestAPR] = useState(0);
  const [totalUSDRewards, setTotalUSDRewards] = useState(BigNumber.from(0));

  useEffect(() => {
    const APR = getHighestRewardAPR(allAPRs);
    setHighestAPR(APR);
  }, [highestAPR, JSON.stringify(allAPRs)]);

  useEffect(() => {
    setTotalUSDRewards(allRewardsUSD);
  }, [JSON.stringify(totalRewardsStr)]);

  const APRBanner = highestAPR ? (
    <>
      <p>Earn up to {formatAPR(highestAPR)} APR in our reward hub.</p>
      <p>{formatEther(totalUSDRewards)}</p>
    </>
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
                <strong>Invest in the project today.</strong>
              </p>
              {APRBanner}
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
