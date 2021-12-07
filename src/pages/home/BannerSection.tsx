import React from 'react';
import BannerImg from '../../assets/banner-img.png';
const BannerSection = () => {
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
              <p>Earn up to 500% APR in our reward hub.</p>
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
