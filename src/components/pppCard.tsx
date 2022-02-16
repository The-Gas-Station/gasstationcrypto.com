import React from 'react';

class PppCard extends React.Component {
  render() {
    return (
      <div className="col-lg-3 ppp-card">
        <div className="flex-column ">
          <div className="header">
            <div className="flex-column ">
              <h3>New Project</h3>
              <p>Earn $NEW / Stake $OLD</p>
            </div>
            <img src="https://via.placeholder.com/80x60" />
          </div>
          <div className="info">
            <button className="join-btn1">More Info</button>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="body">
                <p className="dark">Raise Cap ($OLD)</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="body">
                <h6 className="light">$200,000</h6>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="body">
                <p className="dark">Opened: 1/22/22</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="body">
                <h6 className="light">1%</h6>
              </div>
            </div>
          </div>
          <div className="range">
            <input type="range" className="form-range" id="customRange1" />
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="body">
                <p className="sm-dark">500 BUSD</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="body">
                <h6 className="sm-light">2,500 / 1,000,000 $NEW</h6>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="body">
                <p className="green-l">1 BUSD = 5 $NEW</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="body">
                <h6 className="green-r">1 $NEW = 0.2 BUSD</h6>
              </div>
            </div>
          </div>
          <div className="flex-column">
            <div className="harvest">
              <div className="flex-row d-flex">
                <p>
                  <span className="earned">Earned </span>{' '}
                  <span className="amt1">$NEW</span>
                </p>
              </div>
              <div className="flex-column">
                <div className="flex-row d-flex justify-content-center">
                  <div className="col-lg-2">
                    <img src="https://via.placeholder.com/50x50" />
                  </div>
                  <div className="flex-column">
                    <h6 className="amt">0.00</h6>
                    <p className="value">$0.00 USD</p>
                  </div>
                  <div className="col-lg-2" />
                  <div className="flex-column">
                    <button className="join-btn1">Harvest</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-row d-flex justify-content-center">
            <p className="foot">Commit Funds</p>
          </div>
          <div className="flex-row d-flex justify-content-center">
            <button className="join-btn2">Enable</button>
          </div>
        </div>
      </div>
    );
  }
}
export default PppCard;
