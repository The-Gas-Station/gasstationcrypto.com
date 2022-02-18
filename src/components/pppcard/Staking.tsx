import React from 'react';

class Staking extends React.Component {
  render() {
    return (
      <div>
        <div className="body">
          <p className="dark">Raise Cap ($OLD)</p>
          <p className="light">$200,000</p>
        </div>
        <div className="body">
          <p className="dark">opened: 1/22/22</p>
          <p className="light">1%</p>
        </div>
        <div className="range">
          <input type="range" className="form-range" id="customRange1" />
        </div>
        <div className="body">
          <p className="sm-dark">500 busd</p>
          <p className="sm-light">2,500 / 1,000,000 $new</p>
        </div>
        <div className="body">
          <p className="green">1 busd = 5 $new</p>
          <p className="green">1 $new = 0.2 busd</p>
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
    );
  }
}

export default Staking;
