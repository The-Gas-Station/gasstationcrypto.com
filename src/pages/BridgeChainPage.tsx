import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';

import { CHAIN_NAMES, ChainId } from '../library/constants/chains';
import { CHAIN_INFO } from '../configs';

export const BridgeChainPage = ({ chainId }: { chainId: ChainId }) => {
  const navigate = useNavigate();

  const chainData = CHAIN_INFO[chainId];

  const { readOnlyChainIds } = useConfig();
  const { setCurrentChainId } = useWeb3ConnectionsContext();

  const switchNetwork = (e: any) => {
    const newChainId: ChainId = parseInt(e.target.value);
    setCurrentChainId(newChainId);
    navigate(`/${CHAIN_NAMES[newChainId]}/Bridge`);
  };

  return (
    <>
      <section className="page-background">
        <div className="page-banner-top-title">
          <h3>
            <img src={chainData.tokenImage.replace('/public/', '/')} alt="#" />{' '}
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
        <div className="nfp-banner-center-text">
          <h4>Bridge Assets</h4>
          <p>Migrate Assets From One Network To Another, Simply and Securely</p>
        </div>
      </section>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-6 d-none d-md-block card-list">
          <h4 className="title-msg">Bridge Tokens</h4>
          <div className="convert-grid-block">
            <div className="row justify-content-center">
              <div className="col-md-5 col-lg-5 d-none d-md-block">
                <p>Please Select Your Networks</p>
              </div>
              <div className="col-md-6 col-lg-6 d-none d-md-block">
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
            <div className="row justify-content-center">
              <div className="col-md-5 col-lg-5 d-none d-md-block">
                <p>Select Your Asset</p>
              </div>
              <div className="col-md-6 col-lg-6 d-none d-md-block">
                <span className="top-title">Assets</span>
                <br />
                <select className="select">
                  <option value="">Select Asset</option>
                </select>
              </div>
            </div>
            <br />
            <div className="row justify-content-center">
              <div className="col-md-5 col-lg-5 d-none d-md-block">
                <p>Recipient</p>
              </div>
              <div className="col-md-6 col-lg-6 d-none d-md-block">
                <div className="convert-inner">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Destination Address"
                  />
                </div>
              </div>
            </div>
            <br />
            <div className="row justify-content-center">
              <div className="col-md-5 col-lg-5 d-none d-md-block">
                <p>Amount</p>
              </div>
              <div className="col-md-6 col-lg-6 d-none d-md-block">
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
                <div className="col bridge-amount fee-box">
                  <div className="grid-live-icon d-none d-md-inline-block fee-box">
                    <span className="subtext-left">Void Fees</span>
                    <div className="btn">
                      <span className="active">Use GAS</span>
                      <span className="active">Use Patron</span>
                    </div>
                    <br />
                    <div className="row justify-content-center">
                      <div className="col bridge-amount">
                        <span className="small-left">Token Balance</span>
                        <span className="big-left">Waiver</span>
                      </div>
                      <div className="col bridge-amount">
                        <span className="small-right">700,000,000 bscGAS</span>
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
              </div>
            </div>
            <br />
            <div className="row justify-content-center">
              <div className="col-md-5 col-lg-5 d-none d-md-block">
                <p>Send</p>
              </div>
              <div className="col-md-6 col-lg-6 d-none d-md-block">
                <div className="bridge-amount">
                  <span className="text-left">AMOUNT YOU RECIEVE</span>
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
        <div className="col-md-6 col-lg-4 d-none d-md-block card-list">
          <h4 className="title-msg">Transaction History</h4>
          <div className="convert-grid-block">
            <span className="top-title">ConvertING tokens to shares</span>
            <div className="convert-inner">
              <select className="custom-select">
                <option value="">Select or add token address</option>
              </select>
              <div className="or-btn d-none d-lg-none">OR</div>
            </div>
            <button className="join-btn">Convert Tokens to Shares</button>
          </div>
          <div className="convert-list-block">
            <span className="top-title">ConvertING TOKENS FROM SHARES</span>
            <div className="convert-inner">
              <select className="custom-select">
                <option value="">Select or add token address</option>
              </select>
            </div>
            <button className="join-btn">Convert Tokens from Shares</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BridgeChainPage;
