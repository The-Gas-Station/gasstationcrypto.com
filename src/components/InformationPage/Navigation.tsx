type NavigationProps = {
  isExpanded: boolean;
  toggleExpand: any;
  aboutus: any;
  contracts: any;
  tokenomics: any;
  nfp: any;
  fueltanks: any;
  bridge: any;
  locker: any;
  bulksend: any;
  shares: any;
  disclosures: any;
};
export const Navigation = ({
  isExpanded,
  toggleExpand,
  aboutus,
  contracts,
  tokenomics,
  nfp,
  fueltanks,
  bridge,
  locker,
  bulksend,
  shares,
  disclosures,
}: NavigationProps) => {
  return (
    <>
      <div className="NavigationColumn ">
        <div className={isExpanded ? 'afterExpand' : 'beforeExpand'}>
          <div className="content" onClick={() => toggleExpand()}>
            <p>Welcome to The Gas Station</p>
            <img src="https://via.placeholder.com/50x50"></img>
          </div>
          <br />

          <div className="content" onClick={() => aboutus()}>
            <img src="https://via.placeholder.com/50x50"></img>
            <p>About us</p>
          </div>

          <div className="content" onClick={() => disclosures()}>
            <img src="https://via.placeholder.com/50x50"></img>
            <p>Disclosures</p>
          </div>
          <br />
          <h1>Information</h1>
          <div className="content" onClick={() => contracts()}>
            <img src="https://via.placeholder.com/50x50"></img>
            <p>Contract Addresses</p>
          </div>
          <div className="content" onClick={() => tokenomics()}>
            <img src="https://via.placeholder.com/50x50"></img>
            <p>Tokenomics</p>
          </div>
          <div className="content" onClick={() => nfp()}>
            <img src="https://via.placeholder.com/50x50"></img>
            <p>Non-Fungible Patrons</p>
          </div>
          <div className="content" onClick={() => fueltanks()}>
            <img src="https://via.placeholder.com/50x50"></img>
            <p>Fuel Tanks</p>
          </div>
          <div className="content" onClick={() => bridge()}>
            <img src="https://via.placeholder.com/50x50"></img>
            <p>Bridge</p>
          </div>
          <div className="content" onClick={() => shares()}>
            <img src="https://via.placeholder.com/50x50"></img>
            <p>Shares</p>
          </div>
          <div className="content" onClick={() => locker()}>
            <img src="https://via.placeholder.com/50x50"></img>
            <p>Locker</p>
          </div>
          <div className="content" onClick={() => bulksend()}>
            <img src="https://via.placeholder.com/50x50"></img>
            <p>Bulksend</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navigation;
