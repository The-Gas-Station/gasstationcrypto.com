import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBCollapse } from 'mdb-react-ui-kit';

import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';

import { CHAIN_NAMES, ChainId } from '../library/constants/chains';
import { CHAIN_INFO } from '../configs';
import { TxHistory } from '../components/txHistory';

export const BridgeChainPage = ({ chainId }: { chainId: ChainId }) => {
  const navigate = useNavigate();
  const [showFinished, setShowFinished] = useState(false);
  const [showShow, setShowShow] = useState(false);
  const toggleShowShow = () => setShowShow(!showShow);

  const chainData = CHAIN_INFO[chainId];
  const [isTxHistoryOpen, setIsTxHistoryOpen] = useState(false);
  const toggleShow = () => setIsTxHistoryOpen(!isTxHistoryOpen);

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
      </section>
      <div className="row justify-content-center">
        <div className="col col-md-7 col-lg-7  d-md-block">
          <h4 className="title-msg">Bridge Tokens</h4>
          <div className="convert-grid-block">
            <div className="row justify-content-center card-list">
              <div className="col-lg-3 d-md-block">
                <p>Please Select Your Networks</p>
              </div>
              <div className="col-lg-9 d-md-block">
                <span className="top-title">Sending Network</span>
                <div className="convert-inner">
                  <select className="select">
                    <option value="">Select A Network</option>
                  </select>
                </div>
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
            <br />
            <div className="row justify-content-center card-list">
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
            <br />
            <div className="row justify-content-center card-list">
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
            <br />
            <div className="row justify-content-center card-list">
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
                  <div className="row justify-content-center">
                    <button className="bridge-btn">
                      <span className="text">25%</span>
                    </button>
                    <button className="bridge-btn">
                      <span className="text">50%</span>
                    </button>
                    <button className="bridge-btn">
                      <span className="text">75%</span>
                    </button>
                    <button className="bridge-btn">
                      <span className="text">MAX</span>
                    </button>
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
                      isTxHistoryOpen ? 'open' : ''
                    }`}
                    onClick={toggleShowShow}
                  >
                    <span className=" d-lg-block">
                      {isTxHistoryOpen ? 'Close' : 'Waive Fee?'}
                    </span>
                  </div>
                </div>
                <MDBCollapse show={showShow}>
                  <div className="col bridge-amount">
                    <div className=" d-md-inline-block fee-box">
                      <span className="subtext-left">Void Fees</span>
                      <div className="row justify-content-center">
                        <div className="grid-live-icon">
                          <span
                            className={showFinished ? '' : 'active'}
                            onClick={() => setShowFinished(false)}
                          >
                            Use GAS
                          </span>
                          <span
                            className={showFinished ? 'active' : ''}
                            onClick={() => setShowFinished(true)}
                          >
                            Use Patron
                          </span>
                        </div>
                      </div>
                      <br />
                      <div className="row justify-content-center">
                        <div className="col bridge-amount">
                          <span className="small-left">Token Balance</span>
                          <span className="big-left">Waiver</span>
                        </div>
                        <div className="col bridge-amount">
                          <span className="small-right">
                            700,000,000 bscGAS
                          </span>
                          <span className="big-right">$2.22</span>
                        </div>
                      </div>
                      <div className="footer">
                        <button className="apply">
                          <span className="text">Waive Fees</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </MDBCollapse>
              </div>
            </div>
            <br />
            <div className="row justify-content-center card-list">
              <div className="col-lg-3  d-md-block">
                <p>Send</p>
              </div>
              <div className="col-lg-9  d-md-block">
                <span className="top-title">What You Recieve</span>
                <div className="bridge-amount">
                  <div className="fee-box">
                    <h5>Output</h5>
                  </div>
                  <button className="join-btn">
                    <span className="text">SEND</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-lg-3  d-md-block">
          <h4 className="title-msg">Transaction History</h4>
          <div className={`utility-collapse ${isTxHistoryOpen ? 'open' : ''}`}>
            <div className="card-list">
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
            <TxHistory
              isTxHistoryOpen={isTxHistoryOpen}
              setIsOpen={setIsTxHistoryOpen}
              closeTxHistory={() => setIsTxHistoryOpen(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BridgeChainPage;
