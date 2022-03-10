import earnedBanner from '../../assets/earned.svg';

export const InlineSharesRowCardEarned = () => {
  return (
    <div className="col-lg-3">
      <div className="styled-row2">
        <img src={earnedBanner} />
        <div className="flex-column d-flex">
          <span className="text-pink ">BNB</span>
          <span className="text-white1 ">binance coin</span>
        </div>

        <div className="flex-column d-flex">
          <span className="text-green ">$amtinusd$</span>
          <span className="text-green ">$amtintokens$</span>
        </div>
      </div>
      <button className="button3">Harvest</button>
    </div>
  );
};
export default InlineSharesRowCardEarned;
