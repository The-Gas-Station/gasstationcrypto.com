import React, { useState } from 'react';
import { MDBCollapse } from 'mdb-react-ui-kit';
import { TxHistory } from '../components/txHistory';

type collapseOpen = {
  isTxHistorySmOpen: boolean;
  setIsOpen: any;
  closeTxHistorySm: any;
};

export const TxHistorySm = ({ isTxHistorySmOpen }: collapseOpen) => {
  const [isTxHistoryOpen, setIsTxHistoryOpen] = useState(false);
  const toggleShow = () => setIsTxHistoryOpen(!isTxHistoryOpen);
  return (
    <MDBCollapse show={isTxHistorySmOpen}>
      <div className="inner-content">
        <div className="d-flex flex-column card-list">
          <div className="clean-collapse d-flex flex-row">
            <div className="container-sm">
              <img
                src="https://via.placeholder.com/100x100"
                className="circle-img"
              />
            </div>
            <div className="container-sm">
              <p className="item">$DATE$</p>
              <p className="item">$AMMOUNT of ASSET$</p>
              <p className="item">$STATUS$</p>
              <p className="item">
                <div
                  className={`title-box waiveFee ${
                    isTxHistoryOpen ? 'open' : ''
                  }`}
                  onClick={toggleShow}
                >
                  <span className=" d-lg-block">
                    {isTxHistoryOpen ? 'Hide' : 'Expand For Details'}
                  </span>
                </div>
              </p>
            </div>
          </div>
          <TxHistory
            isTxHistoryOpen={isTxHistoryOpen}
            setIsOpen={setIsTxHistoryOpen}
            closeTxHistory={() => setIsTxHistoryOpen(false)}
          />
        </div>
      </div>
    </MDBCollapse>
  );
};

export default TxHistorySm;
