import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';
import { ethers } from 'ethers';
import numeral from 'numeral';

import useGASTokenTotalLiquidity from '../hooks/useGASTokenTotalLiquidity';
import useGASTokenMarketCap from '../hooks/useGASTokenMarketCap';

import { CHAIN_INFO } from '../configs';

export const NetworkCard = ({ chainId }: { chainId: number }) => {
  const chainData = CHAIN_INFO[chainId];

  const tvl = '50000';
  const liquidity = useGASTokenTotalLiquidity(chainId);
  const marketCap = useGASTokenMarketCap(chainId);

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
                      {numeral(tvl).format('$0,0')}
                    </p>
                  )}

                  <hr />

                  {liquidity && (
                    <p className="card-text">
                      <small>LIQUIDITY</small>
                      {numeral(ethers.utils.formatEther(liquidity)).format(
                        '$0,0',
                      )}
                    </p>
                  )}
                </MDBCarouselItem>
                <MDBCarouselItem>
                  {tvl && (
                    <p className="card-text">
                      <small>TVL</small>
                      {numeral(tvl).format('$0,0')}
                    </p>
                  )}

                  <hr />

                  {marketCap && (
                    <p className="card-text">
                      <small>MARKET CAP</small>
                      {numeral(ethers.utils.formatEther(marketCap)).format(
                        '$0,0',
                      )}
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
