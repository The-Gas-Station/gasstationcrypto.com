import React from 'react';
import { MDBCollapse } from 'mdb-react-ui-kit';

type collapseOpen = {
  isTxHistoryOpen: boolean;
  setIsOpen: any;
  closeTxHistory: any;
};

export const TxHistory = ({ isTxHistoryOpen }: collapseOpen) => {
  return (
    <MDBCollapse show={isTxHistoryOpen}>
      <div className="tx-history-collapse">
        <span className="date">2/14/2022 @ 20:00 PM PST</span>
        <br />
        <span className="date">You Sent: $ASSETNAME</span>
        <div className="col box">
          <div className="col-lg-5 bridge-amount">
            <span className="text-left">From</span>
            <p>Polygon</p>
            <span className="text-left">Amount Sent</span>
            <p>$$$</p>
            <a href="https://scanpage.com">
              <span className="date">View On Block Explorer</span>
            </a>
          </div>
          <div className="col-lg-1 vert-break" />
          <div className="col-lg-5 bridge-amount">
            <span className="text-left">To</span>
            <p>Polygon</p>
            <span className="text-left">Amount Recieved</span>
            <p>$$$</p>
            <a href="https://scanpage.com">
              <span className="date">View On Block Explorer</span>
            </a>
            <img></img>
          </div>
        </div>
        <a href="https://scanpage.com">
          <span className="date">View On Block Explorer(s)</span>
        </a>
      </div>
    </MDBCollapse>
  );
};

export default TxHistory;
