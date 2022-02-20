import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBCollapse } from 'mdb-react-ui-kit';

import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';

import { CHAIN_NAMES, ChainId } from '../library/constants/chains';
import { CHAIN_INFO } from '../configs';
import { BridgeTxModal } from '../components/bridgeTx';
import BridgeTransactionHistory from '../components/BridgeTransactionHistory';
import asset from '../assets/usdc.png';
import network from '../assets/ftm.png';

export const BridgeChainPage = ({ chainId }: { chainId: ChainId }) => {
  const navigate = useNavigate();
  const [showGAS, setShowGAS] = useState(false);
  const [showPatron, setShowPatron] = useState(false);
  const [WaiveFee, setWaiveFee] = useState(false);
  const toggleWaiveFee = () => setWaiveFee(!WaiveFee);
  const [UseGAS, setUseGAS] = useState(false);
  const [UsePatron, setUsePatron] = useState(false);

  const chainData = CHAIN_INFO[chainId];
  const [isBridgeTxOpen, setIsBridgeTxOpen] = useState(false);

  const { readOnlyChainIds } = useConfig();
  const { setCurrentChainId } = useWeb3ConnectionsContext();

  const switchNetwork = (e: any) => {
    const newChainId: ChainId = parseInt(e.target.value);
    setCurrentChainId(newChainId);
    navigate(`/${CHAIN_NAMES[newChainId]}/Bridge`);
  };

  return (
    <>
      <section className="page-background-bridge">
        <div className="bridge-banner-img" />
        <div className="isolate">
          <div className="page-banner-top-title">
            <h3>
              <img
                src={chainData.tokenImage.replace('/public/', '/')}
                alt="#"
                className="img-size"
              />{' '}
              {CHAIN_NAMES[chainId]} Bridge
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
      </section>
      <div className="row justify-content-center row-flex">
        <div className="col-lg-6">
          <h4 className="title-3">Bridge Tokens</h4>
          <div className="convert-grid-block">
            <div className="d-flex flex-column justify-content-center card-body1">
              <h4 className="text-green">Select A Network</h4>
              <div className="row">
                <div className="d-flex flex-row">
                  <div className="d-flex flex-row dropdown">
                    <select className="item-1">
                      <option value="">Select A Receiving Network</option>
                    </select>
                    <img src={network} className="avatar" />
                  </div>
                </div>
              </div>
            </div>
            <div className="white-space" />
            <div className="d-flex flex-column justify-content-center card-body1">
              <h4 className="text-green">Select Your Asset</h4>
              <div className="row">
                <div className="d-flex flex-row">
                  <div className="d-flex flex-row dropdown">
                    <select className="item-1">
                      <option value="">Select Asset</option>
                    </select>
                    <img src={asset} className="avatar" />
                  </div>
                </div>
              </div>
            </div>
            <div className="white-space" />
            {/*<div className="row justify-content-center card-body1">
              <div className="col-lg-3  d-md-block">
                <p>Recipient</p>
              </div>
              <div className="col-lg-9  d-md-block">
                <div className="convert-inner">
                  <span className="top-title">Destination Address</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="0x......."
                  />
                  <label>
                    <input type="checkbox" />
                    Send To $CONNECTED ADDRESS$
                  </label>
                </div>
              </div>
          </div>
          <br />*/}
            <div className="d-flex flex-column justify-content-center card-body1">
              <h4 className="text-green">Amount To Send</h4>
              <br />
              <div className="row">
                <div className="d-flex flex-column  d-md-block">
                  <div className="convert-inner">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter An Amount"
                    />
                    <div className="row">
                      <div className="bridge-amount col-lg-6">
                        <span className="subtext-left">0%</span>
                      </div>
                      <div className="bridge-amount col-lg-6">
                        <span className="subtext-right text-green">100%</span>
                      </div>
                      <div className="range">
                        <input
                          type="range"
                          className="form-range"
                          id="customRange1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="line-break" />
                  <div className="row justify-content-center">
                    <div className="col bridge-amount">
                      <span className="text-left">SERVICE FEE</span>
                      <span className="subtext-left">Estimated Fee</span>
                    </div>
                    <div className="col bridge-amount">
                      <span className="subtext-right">0.05%</span>
                      <span className="subtext-right">$$$</span>
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className={`title-box waiveFee  ${
                        WaiveFee ? 'open' : ''
                      }`}
                      onClick={toggleWaiveFee}
                    >
                      <span className=" d-lg-block">
                        {WaiveFee ? 'Close' : 'Waive Fee?'}
                      </span>
                    </div>
                  </div>
                  <div className={`collapse ${WaiveFee ? 'show' : ''}`}>
                    <div className="col bridge-amount">
                      <div className=" d-md-inline-block fee-box">
                        <span className="subtext-left">Void Fees</span>
                        <div className="d-flex flex-row justify-content-center">
                          <div className="grid-live-icon">
                            <span
                              className={showGAS ? 'active' : ''}
                              onClick={() => {
                                setShowGAS(true);
                                setUseGAS(true);
                                setUsePatron(false);
                                setShowPatron(false);
                              }}
                            >
                              Use GAS
                            </span>
                            <span
                              className={showPatron ? 'active' : ''}
                              onClick={() => {
                                setShowPatron(true);
                                setUsePatron(true);
                                setUseGAS(false);
                                setShowGAS(false);
                              }}
                            >
                              Use Patron
                            </span>
                          </div>
                        </div>
                        <br />
                        <MDBCollapse show={UseGAS}>
                          <div className="d-flex flex-row container">
                            <div className="d-flex flex-column patron-balance">
                              <p className="text-pink">Token Balance</p>
                              <p className="text-green">
                                $connectedNetwork$GAS
                              </p>
                            </div>
                            <div className="d-flex flex-column savings">
                              <span>Fees:</span>
                              <span>
                                <span className="text-green">$0.00 </span>
                                <span className="strike">$2.22</span>
                              </span>
                              <span className="text-green">
                                You Saved $2.22
                              </span>
                            </div>
                          </div>
                          <div className="line-break" />
                          <div className="d-flex flex-row justify-content-center">
                            <div className="col-6">
                              <button className="join-btn">
                                <span className="text-white1">Waive Fees</span>
                              </button>
                            </div>
                          </div>
                        </MDBCollapse>
                        <MDBCollapse show={UsePatron}>
                          <div className="d-flex flex-row container">
                            <div className="d-flex flex-column patron-balance">
                              <p className="text-pink">Select A Patron</p>
                              <div className="bridge-amount">
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                                <img src="https://via.placeholder.com/25x25" />
                              </div>
                            </div>
                            <div className="d-flex flex-column bridge-amount savings">
                              <img src="https://via.placeholder.com/100x100" />
                              <br />
                              <span>$PATRON SELECTED NAME$</span>
                              <span className="text-pink">
                                $COOLDOWN TIMER$
                              </span>
                              <br />
                              <span>Fees:</span>
                              <span>
                                <span className="text-green">$0.00 </span>
                                <span className="strike">$2.22</span>
                              </span>
                              <span className="big-right text-green">
                                You Saved $2.22
                              </span>
                            </div>
                          </div>

                          <div className="line-break" />
                          <div className="d-flex flex-row justify-content-center">
                            <div className="col-6">
                              <button className="join-btn">
                                <span className="text-white1">Waive Fees</span>
                              </button>
                            </div>
                          </div>
                        </MDBCollapse>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="white-space" />
            <div className="d-flex flex-column justify-content-center card-body1">
              <h4 className="text-green">Send</h4>
              <div className="d-flex flex-column d-md-block">
                <div className="bridge-amount">
                  <div className="output-box">
                    <h5>Output</h5>
                  </div>
                  <button className="join-btn">
                    <div
                      onClick={() => {
                        setIsBridgeTxOpen(true);
                      }}
                    >
                      <span className=" d-lg-block">Send</span>
                    </div>
                  </button>
                </div>
                <BridgeTxModal
                  isBridgeTxOpen={isBridgeTxOpen}
                  setIsOpen={setIsBridgeTxOpen}
                  closeBridgeTx={() => setIsBridgeTxOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <h4 className="title-2">Transaction History</h4>
          <BridgeTransactionHistory />
          <BridgeTransactionHistory />
          <BridgeTransactionHistory />
          <BridgeTransactionHistory />
          <BridgeTransactionHistory />
          <BridgeTransactionHistory />
          <BridgeTransactionHistory />
          <BridgeTransactionHistory />
          <BridgeTransactionHistory />
          <BridgeTransactionHistory />
        </div>
      </div>
    </>
  );
};

export default BridgeChainPage;
