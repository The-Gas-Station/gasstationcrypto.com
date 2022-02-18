import React, { Component, useState } from 'react';
import arrow from '../assets/arrow-down.svg';
import Staking from '../components/pppcard/Staking';
type myState = { showComponent: boolean };

class PppCard extends Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    const [showComponent, setShowComponent] = useState(false);
    const [showStaking, setShowStaking] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showMetrics, setShowMetrics] = useState(false);
    const [_Staking, setShowStakingComponent] = useState(true);
    const toggleStaking = () => {
      setShowStaking(!showStaking);
      setShowStakingComponent(!_Staking);
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
                <div className="asset">$new</div>
                <div className="asset"> / </div>
                <div className="stake">stake</div>
                <div className="asset">$old</div>
              </div>
            </div>
            <img src="https://via.placeholder.com/80x60" />
          </div>
          <div className="selection-row">
            <div className="item">
              <div
                className={showStaking ? 'active' : 'inactive'}
                onClick={() => {
                  toggleStaking();
                  setShowDetails(false);
                  setShowMetrics(false);
                  setShowComponent(true);
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
          {showComponent ? <Staking /> : null}
        </div>
      </div>
    );
  }
}
export default PppCard;
