import { useState } from 'react';
import { ethers } from 'ethers';
import numeral from 'numeral';

import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';

import useWidth from '../hooks/useWidth';
import useCombinedTVL from '../hooks/useCombinedTVL';
import useGASTokenCombinedMarketCap from '../hooks/useGASTokenCombinedMarketCap';

import BannerSection from './home/BannerSection';
import BridgeSection from './home/BridgeSection';
import NetworkCard from '../components/NetworkCard';

import Gauge from '../assets/Gauge.svg';
import NFPToken from '../assets/NFPcolor.svg';
import GASToken from '../assets/GASToken.svg';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { CHAIN_INFO } from '../configs';

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
  const { currentChainId } = useWeb3ConnectionsContext();

  const { isTablet, isMobile } = useWidth();

  const combinedTVL = useCombinedTVL();
  const combinedMarketCap = useGASTokenCombinedMarketCap();

  const [sectionList] = useState([
    {
      title: 'Fuel Tanks',
      text: `Fuel Up! Earn GAS Tokens 
      between major crypto networks by staking
      in our Fuel Tanks. Staking for GAS Tokens, Native Ether, USDC,
      & More. Low Risk, High Reward! `,
      btnText: `Take Me There!`,
      img: Gauge,
      btnLink: '/#/hub',
    },
    {
      title: 'GAS Tokens',
      text: `The GAS Token is a dividend paying
      token that offers static rewards in the native
      ether per blockchain. Each network has a total 
      supply of 100B Gas Tokens. To earn ether rewards
      simply hold a minimum of 200,000 GAS Tokens. `,
      btnText: `Buy ${CHAIN_INFO[currentChainId].gasTokenName}!`,
      img: GASToken,
      btnLink: CHAIN_INFO[currentChainId].buyAddress,
    },
    {
      title: 'Non-Fungible Patrons',
      text: `Become a Non-Fungible Patron! 
      Mint a Common, Rare or Legendary NFP
      and enjoy exclusive Patron perks! No Service Fees,
      USDC Dividends, & More!`,
      btnText: 'Mint NFPs!',
      img: NFPToken,
      btnLink: '/#/nfp',
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
          <div className="col-xl-12">
            <div className="total-locked-value">
              <div className="total-locked-title">
                <h3>Total value Locked</h3>
                <h5>All Networks</h5>
              </div>
              <div className="amount-details">
                <div className="amount-tvl">
                  <small>TVL</small>
                  <p>
                    {numeral(ethers.utils.formatEther(combinedTVL)).format(
                      '$0,0',
                    )}
                  </p>
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
        </div>
      </div>
    </>
  );
};

export default HomePage;
