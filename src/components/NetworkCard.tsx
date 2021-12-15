import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';
import { ethers } from 'ethers';
import numeral from 'numeral';

import useTVL from '../hooks/useTVL';
import useGASTokenTotalLiquidity from '../hooks/useGASTokenTotalLiquidity';
import useGASTokenMarketCap from '../hooks/useGASTokenMarketCap';

import { CHAIN_ETHER } from '../library/constants/chains';

import { CHAIN_INFO } from '../configs';

export const NetworkCard = ({ chainId }: { chainId: number }) => {
  const chainData = CHAIN_INFO[chainId];

  const tvl = useTVL(chainId);
  const liquidity = useGASTokenTotalLiquidity(chainId);
  const marketCap = useGASTokenMarketCap(chainId);
  const volume30Day = '';

  return (
    <>
      <div className="card">
        <div className="card-header text-center">
          <div className={`avatar avatar-${chainId}`}>
            <img
              src={chainData.tokenImage.replace('/public/', '/')}
              alt="icon"
            />
          </div>
          {chainData.gasTokenName}
        </div>
        <div className="card-body">
          {chainData.launched ? (
            <MDBCarousel showControls>
              <MDBCarouselInner>
                <MDBCarouselItem className="active">
                  {tvl && (
                    <p className="card-text">
                      <small>TVL</small>
                      {numeral(ethers.utils.formatEther(tvl)).format('$0,0')}
                    </p>
                  )}

                  <hr />

                  {liquidity && (
                    <p className="card-text">
                      <small>LIQUIDITY</small>
                      {numeral(ethers.utils.formatEther(liquidity)).format(
                        '$0,0',
                      )}{' '}
                      in {CHAIN_ETHER[chainId]}
                    </p>
                  )}
                </MDBCarouselItem>
                <MDBCarouselItem>
                  {marketCap && (
                    <p className="card-text">
                      <small>MARKET CAP</small>
                      {numeral(ethers.utils.formatEther(marketCap)).format(
                        '$0,0',
                      )}
                    </p>
                  )}

                  <hr />

                  {volume30Day ? (
                    <p className="card-text">
                      <small>30 Day Volume</small>
                      {numeral(volume30Day).format('$0,0')}
                    </p>
                  ) : (
                    <p className="card-text">
                      <small>&nbsp;</small>
                      &nbsp;
                    </p>
                  )}
                </MDBCarouselItem>
              </MDBCarouselInner>
            </MDBCarousel>
          ) : (
            <MDBCarousel>
              <MDBCarouselInner>
                <MDBCarouselItem className="active">
                  <p className="card-text">
                    <span className="comming-soon">Comming Soon</span>
                  </p>

                  {chainData.launchDate && (
                    <>
                      <hr />
                      <p className="card-text">
                        <small>LAUNCH DATE</small>
                        {chainData.launchDate}
                      </p>
                    </>
                  )}
                </MDBCarouselItem>
              </MDBCarouselInner>
            </MDBCarousel>
          )}
        </div>
      </div>
    </>
  );
};

export default NetworkCard;
