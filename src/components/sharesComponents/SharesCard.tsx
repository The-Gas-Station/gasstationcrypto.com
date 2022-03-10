import { BsBoxArrowUpRight } from 'react-icons/bs';
import SharesStakeModal from './SharesStakeModal';
import { useState } from 'react';

export const SharesCard = () => {
  const [showStakeModal, setShowStakeModal] = useState(false);
  return (
    <>
      <div className="sharesCard">
        <div className="title">
          <div className="stake">
            <img src="https://via.placeholder.com/100x100" />
            asstname
          </div>
          <div className="earn">
            <p className="text-pink">APR</p>
            <p>Total Staked</p>
            <p className="text-green">Total $$$ Staked</p>
          </div>
        </div>
        <div className="body">
          <div className="flexrow">
            <div className="content">
              <div className="innerflex">
                <p>Earned:</p>
                <span>$EARNED$</span>
              </div>
              <div className="innerflex">
                <p>Earned Value:</p>
                <span className="text-green">$$$$$</span>
              </div>
              <div className="innerflex">
                <p>Staked:</p>
                <span>$STAKED$</span>
              </div>
              <div className="innerflex">
                <p>Staked Value:</p>
                <span className="text-green">$$$$$</span>
              </div>
            </div>
          </div>
          <div className="flexrow">
            <div className="content">
              <div className="innerflex">
                <p>Stake Token:</p>
                <span>asst shortname</span>
              </div>
              <div className="innerflex">
                <p>Earned Token:</p>
                <span>asst sharetoken</span>
              </div>
              <div className="innerflex">
                <p>Deposit Fee:</p>
                <span>XXX</span>
              </div>
              <div className="innerflex">
                <p className="text-green">
                  What is this? <BsBoxArrowUpRight />
                </p>
              </div>
            </div>
            <div className="content">
              <button className="button-2">Harvest</button>
              <button className="button-2">Compound</button>
            </div>
          </div>
          <div className="flex-row d-flex justify-content-center align-items-center">
            <p className="bottomtext">
              Swap for $ASSET$ <BsBoxArrowUpRight />
            </p>
            <p className="bottomtext">
              View Contract <BsBoxArrowUpRight />
            </p>
          </div>
        </div>
        <button onClick={() => setShowStakeModal(true)}>Stake</button>
      </div>
      {showStakeModal ? (
        <SharesStakeModal
          showStakeModal={() => setShowStakeModal(true)}
          closeStakeModal={() => setShowStakeModal(false)}
        />
      ) : null}
    </>
  );
};
export default SharesCard;
