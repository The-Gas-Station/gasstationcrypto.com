import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IframeResizer from 'iframe-resizer-react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from 'mdb-react-ui-kit';

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
  const [basicActive, setBasicActive] = useState('tab1');

  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
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
        <div className="col trade-view">
          <MDBTabs pills className="mb-3">
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleBasicClick('tab1')}
                active={basicActive === 'tab1'}
              >
                <div className="d-flex flex-column">
                  <span>bscGAS</span>
                  <span>$PRICE$</span>
                </div>
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleBasicClick('tab2')}
                active={basicActive === 'tab2'}
              >
                <div className="d-flex flex-column">
                  <span>polyGAS</span>
                  <span>$PRICE$</span>
                </div>
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleBasicClick('tab3')}
                active={basicActive === 'tab3'}
              >
                <div className="d-flex flex-column">
                  <span>ftmGAS</span>
                  <span>$PRICE$</span>
                </div>
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleBasicClick('tab4')}
                active={basicActive === 'tab4'}
              >
                <div className="d-flex flex-column">
                  <span>avaxGAS</span>
                  <span>$PRICE$</span>
                </div>
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleBasicClick('tab5')}
                active={basicActive === 'tab5'}
              >
                <div className="d-flex flex-column">
                  <span>movrGAS</span>
                  <span>$PRICE$</span>
                </div>
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleBasicClick('tab6')}
                active={basicActive === 'tab6'}
              >
                <div className="d-flex flex-column">
                  <span>croGAS</span>
                  <span>$PRICE$</span>
                </div>
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent>
            <MDBTabsPane show={basicActive === 'tab1'}>
              <IframeResizer
                log
                src="https://dexscreener.com/bsc/0x340db2a8e77ad047e5e786c94db0ae1593082264?embed=1&theme=dark&trades=0&info=0"
                style={{ width: '100%', minWidth: '100%', height: '75vh' }}
              />
            </MDBTabsPane>
            <MDBTabsPane show={basicActive === 'tab2'}>
              <IframeResizer
                log
                src="https://dexscreener.com/polygon/0x2637cE16E98fCc66F2CCdD36087DEFdCf955b68A?embed=1&theme=dark&trades=0&info=0"
                style={{ width: '100%', minWidth: '100%', height: '75vh' }}
              />
            </MDBTabsPane>
            <MDBTabsPane show={basicActive === 'tab3'}>
              <IframeResizer
                log
                src="https://dexscreener.com/fantom/0x2ae4249f5a33a3ceadc10ddcbc5a9e8abe7680ef?embed=1&theme=dark&trades=0&info=0"
                style={{ width: '100%', minWidth: '100%', height: '75vh' }}
              />
            </MDBTabsPane>
            <MDBTabsPane show={basicActive === 'tab4'}>
              <IframeResizer
                log
                src="https://dexscreener.com/avalanche/0x53fb54e657458d39f8c8a37b797fbaba7552c435?embed=1&theme=dark&trades=0&info=0"
                style={{ width: '100%', minWidth: '100%', height: '75vh' }}
              />
            </MDBTabsPane>
            <MDBTabsPane show={basicActive === 'tab5'}>
              <IframeResizer
                log
                src="https://dexscreener.com/moonriver/0x88e5319621a16696728e8e4bb45a5dd407b85a54?embed=1&theme=dark&trades=0&info=0"
                style={{ width: '100%', minWidth: '100%', height: '75vh' }}
              />
            </MDBTabsPane>
            <MDBTabsPane show={basicActive === 'tab6'}>
              <IframeResizer
                log
                src="https://dexscreener.com/cronos/0x769A41224008F257980E7717e5d47cB012096F42?embed=1&theme=dark&trades=0&info=0"
                style={{ width: '100%', minWidth: '100%', height: '75vh' }}
              />
            </MDBTabsPane>
          </MDBTabsContent>
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
