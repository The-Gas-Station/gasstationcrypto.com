import arrowdown from '../assets/arrow-down.svg';
export const TxHistory = () => {
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
          <div className="complete" /> Complete <img src={arrowdown} />
        </div>
      </div>
    </div>
  );
};

export default TxHistory;
