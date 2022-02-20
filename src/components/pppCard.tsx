import { useState } from 'react';
import arrow from '../assets/arrow-down.svg';
import Staking from './launchpadComponents/pppcard/Staking';
import Details from './launchpadComponents/pppcard/Details';
import Metrics from './launchpadComponents/pppcard/Metrics';

type useProp = {
  stakingProps: Record<string, string>;
  titleProps: Record<string, string>;
};
const PppCard = ({ titleProps, stakingProps }: useProp) => {
  const { stake, earn } = titleProps;
  const [showStaking, setShowStaking] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [showMetrics, setShowMetrics] = useState(false);
  const toggleStaking = () => {
    setShowStaking(!showStaking);
  };
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  const toggleMetrics = () => {
    setShowMetrics(!showMetrics);
  };

  return (
    <div className="col-lg-3 ppp-card">
      <div className="flex-column ">
        <div className="header">
          <div className="flex-column ">
            <h3>New Project</h3>
            <div className="flex-row d-flex flex-wrap">
              <div className="earn">earn</div>
              <div className="asset">{earn}</div>
              <div className="asset"> / </div>
              <div className="stake">stake</div>
              <div className="asset">{stake}</div>
            </div>
          </div>
          <img src="https://via.placeholder.com/80x60" />
        </div>
        <div className="selection-row-inner">
          <div className="item">
            <div
              className={showStaking ? 'active' : 'inactive'}
              onClick={() => {
                toggleStaking();
                setShowDetails(false);
                setShowMetrics(false);
              }}
            >
              <p>staking</p>
              <img src={arrow} />
            </div>
          </div>
          <div className="item">
            <div
              className={showDetails ? 'active' : 'inactive'}
              onClick={() => {
                toggleDetails();
                setShowMetrics(false);
                setShowStaking(false);
              }}
            >
              <p>fund details</p>
              <img src={arrow} />
            </div>
          </div>
          <div className="item">
            <div
              className={showMetrics ? 'active' : 'inactive'}
              onClick={() => {
                toggleMetrics();
                setShowDetails(false);
                setShowStaking(false);
              }}
            >
              <p>metrics</p>
              <img src={arrow} />
            </div>
          </div>
        </div>
        {showStaking ? <Staking stakingProps={stakingProps} /> : null}
        {showDetails ? <Details /> : null}
        {showMetrics ? <Metrics /> : null}
      </div>
    </div>
  );
};
export default PppCard;
