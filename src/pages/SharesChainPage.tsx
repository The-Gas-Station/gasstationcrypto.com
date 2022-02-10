import React, { useState } from 'react';
import { MDBCollapse } from 'mdb-react-ui-kit';

import { ChainId } from '../library/constants/chains';

export const SharesChainPage = ({ chainId }: { chainId: ChainId }) => {
  const [isTxHistoryOpen, setIsTxHistoryOpen] = useState(false);
  const toggleShow = () => setIsTxHistoryOpen(!isTxHistoryOpen);

  return (
    <>
      <div className="row">
        <h4 className="title-msg">Shares</h4>
        <span>Convert Assets To</span>
      </div>
      <div className="row-flex">
        <p className="container">
          <span className="text-white1">Pool Info</span>
        </p>

        <p className="container">
          <span className="text-white1">STAKE</span>
        </p>

        <p className="container">
          <span className="text-white1">$Available Balance$</span>
        </p>

        <p className="container">
          <span className="text-white1">$LIQUIDITY$</span>
        </p>

        <p className="container">
          <span className="text-white1">$APR$</span>
        </p>

        <p className="container">
          <span className="text-white1">$STAKED$</span>
        </p>

        <p className="container">
          <span className="text-white1">$Earned$</span>
        </p>

        <p className="container">
          <span className="text-white1">$ACTIONS$</span>
        </p>
      </div>

      <div className="row card-list-row row-flex">
        <div className="col-lg-1">
          <p>
            <img
              src="https://via.placeholder.com/50x50"
              className="circle-img"
            />
          </p>
        </div>
        <div className="col-lg-2 text">
          <p>
            <span className="text-white1">STAKE</span>
            <br />
            <span className="text-white1">EARN</span>
          </p>
        </div>
        <div className="col-lg-2 text">
          <p>
            <span className="green">$Available Balance$</span>
          </p>
        </div>
        <div className="col-lg-2 text">
          <p>
            <span className="text-white1">$LIQUIDITY$</span>
          </p>
        </div>
        <div className="col-lg-1 text">
          <p>
            <span className="text-white1">$APR$</span>
          </p>
        </div>
        <div className="col-lg-1 text">
          <p>
            <span className="text-white1">$STAKED$</span>
          </p>
        </div>
        <div className="col-lg-2 text">
          <p>
            <span className="text-white1">$Earned$</span>
          </p>
        </div>
        <div className="col-lg-1 text">
          <p>
            <button className="join-btn">
              <div
                className={`title-box ${isTxHistoryOpen ? 'open' : ''}`}
                onClick={toggleShow}
              >
                <span className=" d-lg-block">
                  {isTxHistoryOpen ? 'Close' : 'Expand'}
                </span>
              </div>
            </button>
          </p>
        </div>
        <MDBCollapse show={isTxHistoryOpen}>
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <div className="row card-list-row-inner">
                <div className="col-lg-2">
                  <img src="https://via.placeholder.com/20x80" />
                </div>
                <div className="col-lg-2 text">
                  <span className="text-white1">ASSET</span>
                </div>
                <div className="col-lg-1" />
                <div className="col-lg-3 text">
                  <span className="green">$AMOUNT$</span>
                </div>
                <div className="col-lg-4 text">
                  <button className="join-btn">STAKE</button>
                </div>
              </div>
            </div>
            <div className="col-lg-1" />
            <div className="col-lg-4">
              <div className="row card-list-row-inner">
                <div className="col-lg-2">
                  <img src="https://via.placeholder.com/20x80" />
                </div>
                <div className="col-lg-2 text">
                  <span className="text-white1">ASSET</span>
                </div>
                <div className="col-lg-1" />
                <div className="col-lg-3 text">
                  <span className="green">$AMOUNT$</span>
                </div>
                <div className="col-lg-4 text">
                  <button className="join-btn">HARVEST</button>
                </div>
              </div>
            </div>
          </div>
        </MDBCollapse>
      </div>
    </>
  );
};

export default SharesChainPage;
