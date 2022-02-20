const Staking = (props: any) => {
  const { stakingProps } = props;
  const {
    stake,
    earn,
    start,
    cap,
    saleAmt,
    listingSalePrice,
    calcStablePrice,
    calcSalePrice,
    percentGoal,
    assetImg,
  } = stakingProps;
  return (
    <div>
      <div className="body">
        <p className="dark">Raise Cap ({stake})</p>
        <p className="light">${cap}</p>
      </div>
      <div className="body">
        <p className="dark">opened: {start}</p>
        <p className="light">{percentGoal}%</p>
      </div>
      <div className="range">
        <input type="range" className="form-range" id="customRange1" />
      </div>
      <div className="body">
        <p className="sm-dark">${listingSalePrice}</p>
        <p className="sm-light">
          {saleAmt} {earn}
        </p>
      </div>
      <div className="body">
        <p className="green">
          1 busd = {calcStablePrice} {earn}
        </p>
        <p className="green">
          1 {earn} = {calcSalePrice} busd
        </p>
      </div>
      <div className="flex-column">
        <div className="harvest">
          <div className="flex-row d-flex">
            <p>
              <span className="earned">Earned </span>{' '}
              <span className="amt1">{earn}</span>
            </p>
          </div>
          <div className="flex-column">
            <div className="flex-row d-flex justify-content-center">
              <div className="col-lg-2">
                <img src={assetImg} />
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
};

export default Staking;
