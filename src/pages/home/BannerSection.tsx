import React from 'react';
import BannerImg from '../../assets/banner-img.png';
import HigestAPR from './HighestAPR';
import TotalRewardsUSD from './TotalRewardsUSD';

const BannerSection = () => (
  <div className={`banner-section`}>
    <div className="col-md-6">
      <div className="banner-text">
        <h5 className="text-white">
          We're building the multi-chain crypto bridge so you can swap between
          major crypto networks.
        </h5>
        <p className="text-green">
          <strong>Invest in the project today</strong>
        </p>
        <HigestAPR />
        <TotalRewardsUSD />
        <p className="text-green">
          <strong>Fuel your Tank today!</strong>
        </p>
      </div>
      <div className="banner-img d-block d-md-none">
        <img src={BannerImg} alt="" />
      </div>
    </div>
  </div>
);

export default BannerSection;
