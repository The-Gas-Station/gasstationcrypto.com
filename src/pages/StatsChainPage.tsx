import React from 'react';
import { useNavigate } from 'react-router-dom';
import useWidth from '../hooks/useWidth';
import useCombinedTVL from '../hooks/useCombinedTVL';
import useGASTokenCombinedMarketCap from '../hooks/useGASTokenCombinedMarketCap';
import { ethers } from 'ethers';
import numeral from 'numeral';
import NetworkCard from '../components/NetworkCard';
import Slider from 'react-slick';
import StatsCard from '../components/StatsCard';

import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';

import { CHAIN_NAMES, ChainId } from '../library/constants/chains';
import { CHAIN_INFO } from '../configs';

export const StatsChainPage = ({ chainId }: { chainId: ChainId }) => {
  const navigate = useNavigate();

  const chainData = CHAIN_INFO[chainId];

  const { readOnlyChainIds } = useConfig();
  const { setCurrentChainId } = useWeb3ConnectionsContext();
  const { isTablet, isMobile } = useWidth();

  const combinedTVL = useCombinedTVL();
  const combinedMarketCap = useGASTokenCombinedMarketCap();
  const settings1 = {
    dots: false,
    arrows: true,
    cssEase: 'ease-out',
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const switchNetwork = (e: any) => {
    const newChainId: ChainId = parseInt(e.target.value);
    setCurrentChainId(newChainId);
    navigate(`/${CHAIN_NAMES[newChainId]}/Stats`);
  };

  return (
    <>
      <section className="page-background-bridge">
        <div className="bridge-banner-img">
          <div className="isolate">
            <div className="page-banner-top-title">
              <h3>
                <img
                  src={chainData.tokenImage.replace('/public/', '/')}
                  alt="#"
                  className="img-size"
                />{' '}
                {CHAIN_NAMES[chainId]} Stats
              </h3>
              <select onChange={switchNetwork}>
                <option>Switch Network</option>
                {(readOnlyChainIds || []).map((_chainId) => {
                  return (
                    _chainId != chainId &&
                    CHAIN_INFO[_chainId].launched && (
                      <option key={`switch-chain-${_chainId}`} value={_chainId}>
                        {CHAIN_NAMES[_chainId]}
                      </option>
                    )
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </section>
      <div className="value-block">
        <div className="mt-4 row">
          <div className="col-xl-12">
            <div className="total-locked-value">
              <div className="total-locked-title justify-content-center">
                <h3>Stats</h3>
                <h5>All Networks</h5>
              </div>
              <div className="amount-details justify-content-center">
                <div className="amount-tvl">
                  <small>Total GAS Rewards</small>
                  <p>
                    {numeral(ethers.utils.formatEther(combinedTVL)).format(
                      '$0,0',
                    )}
                  </p>
                </div>
                <div className="amount-tvl">
                  <small>Total Value Locked</small>
                  <p>
                    {numeral(ethers.utils.formatEther(combinedTVL)).format(
                      '$0,0',
                    )}
                  </p>
                </div>
                <div className="amount-tvl">
                  <small>Total Value Burned</small>
                  <p>
                    {numeral(ethers.utils.formatEther(combinedTVL)).format(
                      '$0,0',
                    )}
                  </p>
                </div>
                <div className="amount-tvl">
                  <small>USD MARKET CAP</small>
                  <p>
                    {numeral(
                      ethers.utils.formatEther(combinedMarketCap),
                    ).format('$0,0')}
                  </p>
                </div>
                <div className="amount-tvl">
                  <small>Total Liquidity</small>
                  <p>
                    {numeral(
                      ethers.utils.formatEther(combinedMarketCap),
                    ).format('$0,0')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex row justify-content-center d-none d-md-flex">
        {(readOnlyChainIds || []).map((chainId) => {
          return <StatsCard key={`desktop-${chainId}`} chainId={chainId} />;
        })}
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

export default StatsChainPage;
