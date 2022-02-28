import { useState } from 'react';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';

import InlineSharesRowCardStaked from './inlineSharesRowCardStaked';
import InlineSharesRowCardEarned from './inlineSharesRowCardEarned';

export const SharesRow = () => {
  const [showExpand, setShowExpand] = useState(false);
  const toggleExpand = () => setShowExpand(!showExpand);
  return (
    <>
      <div className="styled-row1">
        <img src="https://via.placeholder.com/50x50" className="circle-img" />

        <div className="global">
          <span className="title">bnb</span>
          <br />
          <span className="sub">binance coin</span>
        </div>
        <div className="global">
          <span className="title text-pink">$APR$</span>
          <br />
          <span className="sub">$Total Staked$</span>
          <br />
          <span className="sub">$Total$$$Staked$</span>
        </div>
        <div className="local">
          <span className="title text-green">$EARNED$</span>
          <br />
          <span className="sub">$Earned$$$Value$</span>
        </div>
        <div className="local">
          <span className="title text-green">$STAKED$</span>
          <br />
          <span className="sub">$Value$$$Staked$</span>
        </div>
        {showExpand ? (
          <RiArrowUpSFill
            className="text-green clickable"
            onClick={() => toggleExpand()}
            style={{ width: '30px', height: '30px' }}
          />
        ) : (
          <RiArrowDownSFill
            className="text-green clickable"
            onClick={() => toggleExpand()}
            style={{ width: '30px', height: '30px' }}
          />
        )}
      </div>
      {showExpand ? (
        <div className="spacearoundrow">
          <InlineSharesRowCardStaked />
          <InlineSharesRowCardEarned />
        </div>
      ) : null}
    </>
  );
};
export default SharesRow;
