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
      <div className="flex-column history">
        <div className="d-flex flex-row justify-content-center">
          <img src="https://via.placeholder.com/100x100" />
          <div className="d-flex flex-column">
            <span>$date$</span>
            <span>$Ammount of Asset$</span>
            <p>$Status$</p>
            <button className="join-btn" onClick={toggleShow}>
              Details
            </button>
          </div>
        </div>
        <TxHistory
          isTxHistoryOpen={isTxHistoryOpen}
          setIsOpen={setIsTxHistoryOpen}
          closeTxHistory={() => setIsTxHistoryOpen(false)}
        />
      </div>

      <div className="flex-column history">
        <div className="d-flex flex-row justify-content-center">
          <img src="https://via.placeholder.com/100x100" />
          <div className="d-flex flex-column">
            <span>$date$</span>
            <span>$Ammount of Asset$</span>
            <p>$Status$</p>
            <button className="join-btn" onClick={toggleShow}>
              Details
            </button>
          </div>
        </div>
        <TxHistory
          isTxHistoryOpen={isTxHistoryOpen}
          setIsOpen={setIsTxHistoryOpen}
          closeTxHistory={() => setIsTxHistoryOpen(false)}
        />
      </div>
      <div className="flex-column history">
        <div className="d-flex flex-row justify-content-center">
          <img src="https://via.placeholder.com/100x100" />
          <div className="d-flex flex-column">
            <span>$date$</span>
            <span>$Ammount of Asset$</span>
            <p>$Status$</p>
            <button className="join-btn" onClick={toggleShow}>
              Details
            </button>
          </div>
        </div>
        <TxHistory
          isTxHistoryOpen={isTxHistoryOpen}
          setIsOpen={setIsTxHistoryOpen}
          closeTxHistory={() => setIsTxHistoryOpen(false)}
        />
      </div>
      <div className="flex-column history">
        <div className="d-flex flex-row justify-content-center">
          <img src="https://via.placeholder.com/100x100" />
          <div className="d-flex flex-column">
            <span>$date$</span>
            <span>$Ammount of Asset$</span>
            <p>$Status$</p>
            <button className="join-btn" onClick={toggleShow}>
              Details
            </button>
          </div>
        </div>
        <TxHistory
          isTxHistoryOpen={isTxHistoryOpen}
          setIsOpen={setIsTxHistoryOpen}
          closeTxHistory={() => setIsTxHistoryOpen(false)}
        />
      </div>
      <div className="flex-column history">
        <div className="d-flex flex-row justify-content-center">
          <img src="https://via.placeholder.com/100x100" />
          <div className="d-flex flex-column">
            <span>$date$</span>
            <span>$Ammount of Asset$</span>
            <p>$Status$</p>
            <button className="join-btn" onClick={toggleShow}>
              Details
            </button>
          </div>
        </div>
        <TxHistory
          isTxHistoryOpen={isTxHistoryOpen}
          setIsOpen={setIsTxHistoryOpen}
          closeTxHistory={() => setIsTxHistoryOpen(false)}
        />
      </div>
      <div className="flex-column history">
        <div className="d-flex flex-row justify-content-center">
          <img src="https://via.placeholder.com/100x100" />
          <div className="d-flex flex-column">
            <span>$date$</span>
            <span>$Ammount of Asset$</span>
            <p>$Status$</p>
            <button className="join-btn" onClick={toggleShow}>
              Details
            </button>
          </div>
        </div>
        <TxHistory
          isTxHistoryOpen={isTxHistoryOpen}
          setIsOpen={setIsTxHistoryOpen}
          closeTxHistory={() => setIsTxHistoryOpen(false)}
        />
      </div>
    </MDBCollapse>
  );
};

export default TxHistorySm;
