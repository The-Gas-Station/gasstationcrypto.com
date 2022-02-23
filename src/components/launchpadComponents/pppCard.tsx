import { useState } from 'react';
import ExpandedProjectInfo from '../launchpadComponents/ExpandedProjectInfo';
import Staking from './pppcard/Staking';
import Details from './pppcard/Details';
import Metrics from './pppcard/Metrics';
import { GiGems } from 'react-icons/gi';
import {
  IoSparklesOutline,
  IoPieChartOutline,
  IoNewspaperOutline,
  IoSpeedometerOutline,
  IoArrowForwardCircleOutline,
} from 'react-icons/io5';
type useProp = {
  stakingProps: Record<string, string>;
  titleProps: Record<string, string>;
};

const PppCard = ({ titleProps, stakingProps }: useProp) => {
  const { stake, earn } = titleProps;
  const [showExpandedProjectInfo, setShowExpandedProjectInfo] = useState(false);
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
    <>
      {showExpandedProjectInfo ? (
        <ExpandedProjectInfo
          showExpandedProjectInfo={showExpandedProjectInfo}
          setExpandedProjectInfo={false}
          closeExpandedProjectInfo={() => setShowExpandedProjectInfo(false)}
          stakingProps={stakingProps}
        />
      ) : null}

      <div className="col-lg-3 ppp-card">
        <div className="flex-column ">
          <div className="header">
            <div className="flex-column">
              <h3>
                <GiGems />
                New Project
                <IoSparklesOutline />
              </h3>
              <div className="flex-row d-flex flex-wrap">
                <div className="earn">earn</div>
                <div className="asset">{earn}</div>
                <div className="asset"> / </div>
                <div className="stake">stake</div>
                <div className="asset">{stake}</div>
              </div>
              <div
                className="earn clickable"
                onClick={() => setShowExpandedProjectInfo(true)}
              >
                More Info <IoArrowForwardCircleOutline />{' '}
              </div>
            </div>
            <img src="https://via.placeholder.com/80x80" />
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
                <p>
                  staking <IoSpeedometerOutline />
                </p>
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
                <p>
                  fund details <IoNewspaperOutline />
                </p>
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
                <p>
                  metrics <IoPieChartOutline />
                </p>
              </div>
            </div>
          </div>
          {showStaking ? <Staking stakingProps={stakingProps} /> : null}
          {showDetails ? <Details /> : null}
          {showMetrics ? <Metrics /> : null}
        </div>
      </div>
    </>
  );
};
export default PppCard;
