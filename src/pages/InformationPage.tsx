import { useState } from 'react';
import InformationContent from '../components/InformationPage/InformationContent';
import Navigation from '../components/InformationPage/Navigation';
export const InformationPage = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleExpand = () => setIsExpanded(!isExpanded);
  const [contracts, Contracts] = useState(true);
  const [aboutus, aboutUs] = useState(false);
  const [tokenomics, Tokenomics] = useState(false);
  const [nfp, NFP] = useState(false);
  const [shares, Shares] = useState(false);
  const [fueltanks, Fueltanks] = useState(false);
  const [bridge, Bridge] = useState(false);
  const [bulksend, Bulksend] = useState(false);
  const [locker, Locker] = useState(false);
  const [disclosures, Disclosures] = useState(false);
  const closeAll = () => {
    Contracts(false);
    aboutUs(false);
    Tokenomics(false);
    NFP(false);
    Shares(false);
    Fueltanks(false);
    Bridge(false);
    Bulksend(false);
    Locker(false);
    Disclosures(false);
  };
  return (
    <>
      <div className="InformationPageView">
        <Navigation
          isExpanded={isExpanded}
          toggleExpand={() => toggleExpand()}
          aboutus={() => {
            closeAll();
            aboutUs(true);
          }}
          contracts={() => {
            closeAll();
            Contracts(true);
          }}
          tokenomics={() => {
            closeAll();
            Tokenomics(true);
          }}
          nfp={() => {
            closeAll();
            NFP(true);
          }}
          fueltanks={() => {
            closeAll();
            Fueltanks(true);
          }}
          bridge={() => {
            closeAll();
            Bridge(true);
          }}
          locker={() => {
            closeAll();
            Locker(true);
          }}
          bulksend={() => {
            closeAll();
            Bulksend(true);
          }}
          shares={() => {
            closeAll();
            Shares(true);
          }}
          disclosures={() => {
            closeAll();
            Disclosures(true);
          }}
        />

        <InformationContent
          contracts={contracts}
          aboutus={aboutus}
          tokenomics={tokenomics}
          nfp={nfp}
          fueltanks={fueltanks}
          bridge={bridge}
          locker={locker}
          bulksend={bulksend}
          shares={shares}
          disclosures={disclosures}
        />
      </div>
    </>
  );
};
export default InformationPage;
