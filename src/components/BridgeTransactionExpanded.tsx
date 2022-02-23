export const BridgeTransactionExpanded = () => {
  return (
    <div className="body">
      <div className="innerbody">
        <div className="item">
          <p>From</p>
          <div className="details">
            <span>
              <img src="https://via.placeholder.com/20x20" />
              BSC
            </span>
            <span>/</span>
            <span>
              <img src="https://via.placeholder.com/20x20" />
              USDC
            </span>
          </div>
        </div>
        <div className="vert-break" />
        <div className="item">
          <p>To</p>
          <div className="details">
            <span>
              <img src="https://via.placeholder.com/20x20" />
              Polygon
            </span>
            <span>/</span>
            <span>
              <img src="https://via.placeholder.com/20x20" />
              USDC
            </span>
          </div>
        </div>
      </div>
      <div className="outerbody">
        <div className="item">
          <span>Amount [USDC]</span>
          <p>82.45</p>
        </div>

        <div className="item">
          <span>Status</span>
          <p>4/4 Complete</p>
        </div>

        <div className="item">
          <a href="https://www.google.com">
            <p>See Block Info</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BridgeTransactionExpanded;
