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
      <div className="inner-content">
        <div className="row card-list-row row-flex">
          <div className="container">
            <span className="date">2/14/2022 @ 20:00 PM PST</span>
          </div>
          <div className="container">
            <span className="date">2/14/2022 @ 20:00 PM PST</span>
          </div>
        </div>
      </div>
    </MDBCollapse>
  );
};

export default TxHistory;
