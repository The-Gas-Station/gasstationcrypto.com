import React from 'react';
import BannerImg from '../../assets/banner-img.png';
import HigestAPR from './HighestAPR';
import TotalRewardsUSD from './TotalRewardsUSD';

import { useWeb3ConnectionsContext } from '../../library/providers/Web3ConnectionsProvider';

const BannerSection = () => {
  const { currentChainId } = useWeb3ConnectionsContext();

  return (
    <div className={`banner-section-wrapper`}>
      <div className={`banner-section`}>
        <div className="col-md-6">
          <div className="banner-text">
            <h5 className="text-white">
              Welcome To The Gas Station. Dividend Rewards In Native Ether
              Coming To Every EVM Blockchain.
            </h5>
            <h3 className="text-green">Fuel Your Tank Today!</h3>
            <TotalRewardsUSD />
            <HigestAPR key={currentChainId} chainId={currentChainId} />
          </div>
          <div className="banner-img d-block d-md-none">
            <img src={BannerImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
