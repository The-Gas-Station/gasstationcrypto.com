import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBCollapse } from 'mdb-react-ui-kit';

import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';

import { CHAIN_NAMES, ChainId } from '../library/constants/chains';
import { CHAIN_INFO } from '../configs';
import { BridgeTxModal } from '../components/bridgeTx';
import { TxHistorySm } from '../components/txHistorysm';

export const BridgeChainPage = ({ chainId }: { chainId: ChainId }) => {
  const navigate = useNavigate();
  const [showGAS, setShowGAS] = useState(false);
  const [showPatron, setShowPatron] = useState(false);
  const [WaiveFee, setWaiveFee] = useState(false);
  const toggleWaiveFee = () => setWaiveFee(!WaiveFee);
  const [UseGAS, setUseGAS] = useState(false);
  const [UsePatron, setUsePatron] = useState(false);

  const chainData = CHAIN_INFO[chainId];
  const [isTxHistoryOpen, setIsTxHistoryOpen] = useState(false);
  const toggleShow = () => setIsTxHistoryOpen(!isTxHistoryOpen);
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
        <div className="bridge-banner-img">
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
        </div>
      </section>
      <div className="row justify-content-center row-flex">
        <div className="col col-md-7 col-lg-8  d-md-block container">
          <h4 className="title-msg">Bridge Tokens</h4>
          <div className="convert-grid-block">
            <div className="row justify-content-center card-body1">
              <div className="col-lg-3 d-md-block">
                <p>Select A Network</p>
              </div>
              <div className="col-lg-9 d-md-block">
                {/*<span className="top-title">Sending Network</span>
                <div className="convert-inner">
                  <select className="select">
                    <option value="">Select A Network</option>
                  </select>
          </div>*/}
                <div className="convert-list-block">
                  <span className="top-title">Receiving Network</span>
                  <div className="convert-inner">
                    <select className="select">
                      <option value="">Select A Network</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="white-space" />
            <div className="row justify-content-center card-body1">
              <div className="col-lg-3  d-md-block">
                <p>Select Your Asset</p>
              </div>
              <div className="col-lg-9  d-md-block">
                <span className="top-title">Assets</span>
                <br />
                <select className="select">
                  <option value="">Select Asset</option>
                </select>
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
            <div className="row justify-content-center card-body1">
              <div className="col-lg-3  d-md-block">
                <p>Amount</p>
              </div>
              <div className="col-lg-9  d-md-block">
                <div className="convert-inner">
                  <span className="top-title">Enter Amount To Send</span>
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
                    className={`title-box waiveFee  ${WaiveFee ? 'open' : ''}`}
                    onClick={toggleWaiveFee}
                  >
                    <span className=" d-lg-block">
                      {WaiveFee ? 'Close' : 'Waive Fee?'}
                    </span>
                  </div>
                </div>
                <MDBCollapse show={WaiveFee}>
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
                        <div className="d-flex flex-row justify-content-center">
                          <div className="col bridge-amount">
                            <span className="small-left">Token Balance</span>
                            <span className="big-left">Fees</span>
                          </div>
                          <div className="col bridge-amount">
                            <span className="small-right">
                              700,000,000 bscGAS
                            </span>
                            <span className="big-right">
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
                      <MDBCollapse show={UsePatron}>
                        <div className="d-flex flex-row justify-content-center">
                          <div className="col bridge-amount">
                            <span className="small-left">Patron Balance</span>
                            <span className="big-left">Fees</span>
                          </div>
                          <div className="col bridge-amount">
                            <span className="small-right">1 Patron</span>
                            <span className="big-right">
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
                </MDBCollapse>
              </div>
            </div>
            <div className="white-space" />
            <div className="row justify-content-center card-body1">
              <div className="col-lg-3  d-md-block">
                <p>Send</p>
              </div>
              <div className="col-lg-9  d-md-block">
                <span className="top-title">What You Recieve</span>
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
        <div className="col-md-3 col-lg-3  d-md-block">
          <h4 className="title-msg">Transaction History</h4>
          <div className={`utility-collapse  ${isTxHistoryOpen ? 'open' : ''}`}>
            <div className="card-body1">
              <button className="join-btn">
                <div
                  className={`title-box ${isTxHistoryOpen ? 'open' : ''}`}
                  onClick={toggleShow}
                >
                  <span className=" d-lg-block">
                    {isTxHistoryOpen ? 'Hide History' : 'Show History'}
                  </span>
                </div>
              </button>
            </div>
            <div className="vh70">
              <TxHistorySm
                isTxHistorySmOpen={isTxHistoryOpen}
                setIsOpen={setIsTxHistoryOpen}
                closeTxHistorySm={() => setIsTxHistoryOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BridgeChainPage;
