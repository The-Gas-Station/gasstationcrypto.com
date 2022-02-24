import stakedBanner from '../../assets/banner.svg';

export const InlineSharesRowCardStaked = () => {
  return (
    <div className="col-lg-3">
      <div className="styled-row2">
        <img src={stakedBanner} />
        <div className="flex-column d-flex">
          <span className="title">BNB</span>
          <span className="sub">binance-coin</span>
        </div>

        <div className="flex-column d-flex">
          <span className="text-green">$amtinusd$</span>
          <span className="text-green">$amtintokens$</span>
        </div>
      </div>
      <button className="button3">Stake</button>
    </div>
  );
};
export default InlineSharesRowCardStaked;
