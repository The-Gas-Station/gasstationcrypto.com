import React from 'react';
import { useNavigate } from 'react-router-dom';
import IframeResizer from 'iframe-resizer-react';

import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';

import { CHAIN_NAMES, ChainId } from '../library/constants/chains';
import { CHAIN_INFO } from '../configs';
import swap from '../assets/swap.svg';

export const TradeChainPage = ({ chainId }: { chainId: ChainId }) => {
  const navigate = useNavigate();

  const chainData = CHAIN_INFO[chainId];

  const { readOnlyChainIds } = useConfig();
  const { setCurrentChainId } = useWeb3ConnectionsContext();

  const switchNetwork = (e: any) => {
    const newChainId: ChainId = parseInt(e.target.value);
    setCurrentChainId(newChainId);
    navigate(`/${CHAIN_NAMES[newChainId]}/Trade`);
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
                {CHAIN_NAMES[chainId]} Trade
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
      <div className="d-flex flex-row">
        <div className="d-flex col trade-view">
          <IframeResizer
            log
            src="https://dexscreener.com/cronos/0x769A41224008F257980E7717e5d47cB012096F42?embed=1&theme=dark&trades=0&info=0"
            style={{ width: '100%', minWidth: '100%', height: '75vh' }}
          />
        </div>
        <div className="col-2 d-none d-md-block">
          <div className="box1">
            <div className="header">
              <img src={swap} />
              <span>swap</span>
            </div>
            <div className="body">
              <span>From</span>
              <select>
                <option value="">Select Asset</option>
              </select>
              <span>Amount</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter An Amount"
              />
              <div className="range">
                <input type="range" className="form-range" id="customRange1" />
              </div>
              <div className="d-flex flex-row justify-content-center">
                <img src={swap} />
              </div>
              <span>To</span>
              <select>
                <option value="">Select Asset</option>
              </select>
              <span>Amount</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter An Amount"
              />
              <div className="range">
                <input type="range" className="form-range" id="customRange1" />
              </div>
            </div>
            <div className="footer">
              <button className="join-btn">
                <span className="text-white1">SWAP</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TradeChainPage;
