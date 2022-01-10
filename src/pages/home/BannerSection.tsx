import React, { useEffect, useState } from 'react';
import BannerImg from '../../assets/banner-img.png';

import { useConfig } from '../../library/providers/ConfigProvider';
import usePools from '../../hooks/usePools';
import numeral from 'numeral';

const getHighestRewardAPR = (aprs: number[]) => {
  const highestAPRs = aprs.sort((a, b) => b - a);
  return highestAPRs?.shift() || 0;
};

const formatAPR = (apr: number): string => numeral(apr).format('0.00%');

const BannerSection = () => {
  const { readOnlyChainIds: chainIds = [] } = useConfig();
  const allAPRs = chainIds
    .map((chainId) => {
      const pools = usePools(chainId);
      return pools.map((p) => p.apr);
    })
    .flat(2);
  const [highAPR, setHighAPR] = useState(0);
  useEffect(() => {
    const APR = getHighestRewardAPR(allAPRs);
    setHighAPR(APR);
  }, [highAPR, allAPRs.reduce((a, b) => a + b)]);
  const APRBanner = highAPR ? (
    <p>Earn up to {formatAPR(highAPR)} APR in our reward hub.</p>
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
