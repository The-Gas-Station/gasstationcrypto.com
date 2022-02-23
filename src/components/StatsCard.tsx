import React, { useState } from 'react';
import { CHAIN_INFO } from '../configs';
import { ethers } from 'ethers';
import numeral from 'numeral';
import { CHAIN_ETHER } from '../library/constants/chains';
import useTVL from '../hooks/useTVL';
import useGASTokenTotalLiquidity from '../hooks/useGASTokenTotalLiquidity';
import useGASTokenMarketCap from '../hooks/useGASTokenMarketCap';

export const StatsCard = ({ chainId }: { chainId: number }) => {
  const chainData = CHAIN_INFO[chainId];
  const tvl = useTVL(chainId);
  const liquidity = useGASTokenTotalLiquidity(chainId);
  const marketCap = useGASTokenMarketCap(chainId);
  const [ExpandInfo, setExpandInfo] = useState(false);
  const toggleExpandInfo = () => setExpandInfo(!ExpandInfo);
  return (
    <div className="col-lg-4">
      <div className="flex-row box1">
        <div className="flex-column flex-wrap ">
          <div className="header">
            <div className={`avatar avatar-${chainId}`}>
              <img
                src={chainData.tokenImage.replace('/public/', '/')}
                alt="icon"
              />
            </div>
            <span>{chainData.gasTokenName}</span>
          </div>

          <div className="d-flex flex-column flex-wrap">
            <div className="body">
              <div className="d-flex flex-row justify-content-center flex-wrap">
                <div className="card-list-row1">
                  <span className="text-green left">Market Capital</span>
                  <span className="text-pink right">
                    {numeral(ethers.utils.formatEther(marketCap)).format(
                      '$0,0',
                    )}
                  </span>
                </div>
                <div className="linebr-sm" />
                <div className="card-list-row1">
                  <span className="text-green left">Total Value Locked</span>
                  <span className="text-pink right">
                    {numeral(ethers.utils.formatEther(tvl)).format('$0,0')}
                  </span>
                </div>
                <div className="linebr-sm" />
                <div className="card-list-row1">
                  <span className="text-green left">Liquidity</span>
                  <span className="text-pink right">
                    {numeral(ethers.utils.formatEther(liquidity)).format(
                      '$0,0',
                    )}{' '}
                    in {CHAIN_ETHER[chainId]}
                  </span>
                </div>
                <div className="linebr-sm" />
                <div className="card-list-row1">
                  <span className="text-green left">Total Supply</span>
                  <span className="text-pink right">
                    100,000,000,000 {chainData.gasTokenName}
                  </span>
                </div>
                <div className="linebr-sm" />
                <div className="card-list-row1">
                  <span className="text-green left">Circulating Supply</span>
                  <span className="text-pink right">$$$</span>
                </div>
                <div className="linebr-sm" />
                <div className="card-list-row1">
                  <span className="text-green left">Burned Supply</span>
                  <span className="text-pink right">$$$</span>
                </div>
                <div className="linebr-sm" />
                <div className="card-list-row1">
                  <span className="text-green left">% Burned Supply</span>
                  <span className="text-pink right">$$$</span>
                </div>
                <div className="linebr-sm" />
                <div className="card-list-row1">
                  <span className="text-green left">% Held In Wallets</span>
                  <span className="text-pink right">$$$</span>
                </div>
                <div className="linebr-sm" />
                <div className="card-list-row1">
                  <span className="text-green left">% Held In Contracts</span>
                  <span className="text-pink right">$$$</span>
                </div>
                <div className="linebr-sm" />
                <div className="card-list-row1">
                  <span className="text-green left">Dividend Rate</span>
                  <span className="text-pink right">$$$</span>
                </div>
              </div>
              <div className="linebr-sm" />
              <div className="flex-row">
                <span
                  className="clickable d-lg-block text-pink"
                  onClick={toggleExpandInfo}
                >
                  {ExpandInfo ? 'Close' : 'More Info'}
                </span>
              </div>

              <div className={`collapse ${ExpandInfo ? 'show' : ''}`}>
                <div className="d-flex flex-row justify-content-center flex-wrap">
                  <div className="card-list-row1">
                    <span className="text-green left">
                      Contract Address (Token)
                    </span>
                    <span className="text-pink right">$$$</span>
                  </div>
                  <div className="linebr-sm" />
                  <div className="card-list-row1">
                    <span className="text-green left">
                      Contract Address (LP)
                    </span>
                    <span className="text-pink right">$$$</span>
                  </div>
                  <div className="linebr-sm" />
                  <div className="card-list-row1">
                    <span className="text-green left">Launch Date</span>
                    <span className="text-pink right">$$$</span>
                  </div>
                  <div className="linebr-sm" />
                  <div className="card-list-row1">
                    <span className="text-green left">Holder Count</span>
                    <span className="text-pink right">$$$</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
