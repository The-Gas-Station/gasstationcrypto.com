import GasToken from '../../assets/gascoin.svg';
import Bridge from '../../assets/bridge.svg';
import BulkSend from '../../assets/send.svg';
import FuelTank from '../../assets/fuel.svg';
import NFP from '../../assets/nfpface.svg';
import Locker from '../../assets/safe.svg';
import Shares from '../../assets/shares.svg';
import Warn from '../../assets/warning.svg';
import Contract from '../../assets/code.svg';
import Aboutus from '../../assets/group.svg';
import Fuelcan from '../../assets/fuelcan.svg';

import { useState } from 'react';
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
  const [showMobileExpand, setShowMobileExpand] = useState(true);
  return (
    <>
      <div
        className="MobileExpandButton"
        onClick={() => setShowMobileExpand(!showMobileExpand)}
      >
        {showMobileExpand ? 'Hide Menu' : 'Expand Menu'}
      </div>

      <div className={showMobileExpand ? 'MobileExpand' : 'NoExpand'}>
        <div className="NavigationColumn ">
          <div className={isExpanded ? 'afterExpand' : 'beforeExpand'}>
            <div className="content" onClick={() => toggleExpand()}>
              <p>Welcome to The Gas Station</p>
              <img src={Fuelcan} />
            </div>
            <br />

            <div className="content" onClick={() => aboutus()}>
              <img src={Aboutus} />
              <p>About us</p>
            </div>

            <div className="content" onClick={() => disclosures()}>
              <img src={Warn} />
              <p>Disclosures</p>
            </div>
            <br />
            <h1>Information</h1>
            <div className="content" onClick={() => contracts()}>
              <img src={Contract} />
              <p>Contract Addresses</p>
            </div>
            <div className="content" onClick={() => tokenomics()}>
              <img src={GasToken}></img>
              <p>Tokenomics</p>
            </div>
            <div className="content" onClick={() => nfp()}>
              <img src={NFP} />
              <p>Non-Fungible Patrons</p>
            </div>
            <div className="content" onClick={() => fueltanks()}>
              <img src={FuelTank} />
              <p>Fuel Tanks</p>
            </div>
            <div className="content" onClick={() => bridge()}>
              <img src={Bridge} />
              <p>Bridge</p>
            </div>
            <div className="content" onClick={() => shares()}>
              <img src={Shares} />
              <p>Shares</p>
            </div>
            <div className="content" onClick={() => locker()}>
              <img src={Locker} />
              <p>Locker</p>
            </div>
            <div className="content" onClick={() => bulksend()}>
              <img src={BulkSend} />
              <p>Bulksend</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navigation;
