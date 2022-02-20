import { useState } from 'react';
import arrowdown from '../assets/arrow-down.svg';
import BridgeTransactionExpanded from './BridgeTransactionExpanded';
export const BridgeTransactionHistory = () => {
  const [showExpanded, setShowExpanded] = useState(false);
  const toggleExpanded = () => setShowExpanded(!showExpanded);
  return (
    <div className="tx-card">
      <div className="head">
        <div className="leftside">
          <div className="date">11/21/22</div>
          <div className="id">
            ID:<span>connected address</span>
          </div>
        </div>
        <div className="rightside">
          Complete{' '}
          <img
            src={arrowdown}
            onClick={() => {
              toggleExpanded();
            }}
          />
        </div>
      </div>

      {showExpanded ? <BridgeTransactionExpanded /> : null}
    </div>
  );
};

export default BridgeTransactionHistory;
