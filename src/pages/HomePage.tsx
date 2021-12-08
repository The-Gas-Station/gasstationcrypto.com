import { useState } from 'react';
import { ethers } from 'ethers';
import numeral from 'numeral';

import { useConfig } from '../library/providers/ConfigProvider';

import useWidth from '../hooks/useWidth';
import useGASTokenCombinedMarketCap from '../hooks/useGASTokenCombinedMarketCap';

import BannerSection from './home/BannerSection';
import BridgeSection from './home/BridgeSection';
import NetworkCard from '../components/NetworkCard';

import UsdcToken from '../assets/tokens/usdc.png';
import NFPToken from '../assets/tokens/nfp.png';
import Fuelcan from '../assets/fuelcan.svg';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings1 = {
  dots: false,
  arrows: true,
  cssEase: 'ease-out',
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const HomePage = () => {
  const { readOnlyChainIds } = useConfig();
  const { isTablet, isMobile } = useWidth();

  const combinedMarketCap = useGASTokenCombinedMarketCap();

  const [sectionList] = useState([
    {
      title: 'USDC Bridge',
      text: `Gas Station allows you to swap USDC
      between major crypto networks instantly,
      easily and with the lowest fees. We also
      provide a faucet, so you're never without
      Gas fees ever again.`,
      launchDate: `Launching December 2021`,
      img: UsdcToken,
    },
    {
      title: 'GAS Tokens',
      text: `Each network has a total supply of 100b
      Gas Tokens. Tokens are available now! Buy
      tokens today to receive discounts on Gas
      fees while investing in our project early-
      stage for maximum rewards.`,
      btnText: `Buy GAS on ApeSwap`,
      img: Fuelcan,
    },
    {
      title: 'Non-Fungible Patrons',
      text: `Become a Non-Fungible Patron today by
      buying a Common, Rare or Legendary NET
      and enjoy exclusive Patron perks – free
      transactions and transaction fees, to name
      a few.`,
      btnText: 'Snag a Gas Station NFT',
      img: NFPToken,
    },
  ]);

  return (
    <>
      <BannerSection />
      <div className="services-block">
        <div className="row gx-xxl-5 justify-content-around">
          {sectionList.map((list, i) => {
            return (
              <div className="col-md-6 col-xl-4" key={i}>
                <div className="flex-fill services-item">
                  <BridgeSection bridgeProps={list} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="value-block">
        <div className="mt-4 row">
          <div className="col-xl-9">
            <div className="total-locked-value">
              <div className="total-locked-title">
                <h3>Total value Locked</h3>
                <h5>All Networks</h5>
              </div>
              <div className="amount-details">
                <div className="amount-tvl">
                  <small>TVL</small>
                  <p>$11,234,567</p>
                </div>
                <div className="amount-market-cap">
                  <small>USD MARKET CAP</small>
                  <p>
                    {numeral(
                      ethers.utils.formatEther(combinedMarketCap),
                    ).format('$0,0')}
                  </p>
                </div>
              </div>
              <div className="all-network-list">
                {isTablet || isMobile ? (
                  <div className="value-slider">
                    <Slider {...settings1}>
                      {(readOnlyChainIds || []).map((chainId) => {
                        return (
                          <NetworkCard
                            key={`mobile-${chainId}`}
                            chainId={chainId}
                          />
                        );
                      })}
                    </Slider>
                  </div>
                ) : (
                  (readOnlyChainIds || []).map((chainId) => {
                    return (
                      <NetworkCard
                        key={`desktop-${chainId}`}
                        chainId={chainId}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-3 ">
            <div className="upcoming-events flex-fill">
              <h5 className="upcoming-title mb-3">Upcoming events</h5>
              <ul className="list-group w-100">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="text-white">
                      Non Fungible Patrons: Rare Mint 2/5
                    </div>
                    <small>10 October 2021</small>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="text-white">polyGAS Tax Reduces -1%</div>
                    <small>3 October 2021</small>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="text-white">bscGAS Tax Reduces -1%</div>
                    <small>3 October 2021</small>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="text-white">
                      ftmGAS Liquidity Mining Event
                    </div>
                    <small>12 September - 10 November 2021</small>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="text-white">
                      Non Fungible Partons: Rare Mint 1/5
                    </div>
                    <small>3 September 2021</small>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
