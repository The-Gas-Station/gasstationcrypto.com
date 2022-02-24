import { useState } from 'react';
import { IoArrowUp, IoArrowDown } from 'react-icons/io5';

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
          {showExpanded ? (
            <IoArrowUp
              className="text-green clickable"
              style={{ width: '30px', height: '30px', margin: '3px' }}
              onClick={() => {
                toggleExpanded();
              }}
            />
          ) : (
            <IoArrowDown
              className="text-green clickable"
              style={{ width: '30px', height: '30px', margin: '3px' }}
              onClick={() => {
                toggleExpanded();
              }}
            />
          )}
        </div>
      </div>
      {showExpanded ? <BridgeTransactionExpanded /> : null}
    </div>
  );
};

export default BridgeTransactionHistory;
