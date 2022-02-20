import { useState } from 'react';
import PppCard from '../components/pppCard';
import rocket from '../assets/rocket.svg';
import headerlogo from '../assets/ppp.svg';
import listing0 from '../components/launchpadComponents/listing/listing0';
import TermsConditions from '../components/launchpadComponents/TermsConditions';

export const LaunchPadChainPage = () => {
  const [showConditions, setShowConditions] = useState(true);
  return (
    <>
      <TermsConditions
        showConditions={showConditions}
        setIsOpen={true}
        closeConditions={() => setShowConditions(false)}
      />

      <div className="flex-row d-flex galaxy">
        <div className="stars stars2 stars3"></div>
        <img src={rocket} />
        <img src={headerlogo} className="title" />
      </div>
      <div className="selection-row">
        <h2 className="title-2">CrowdFunding</h2>
        <h4 className="title-3">Support New Projects</h4>
        <button className="button2">+ Apply as a Project</button>
      </div>
      <div className="flex-row d-flex flex-wrap justify-content-center">
        <PppCard stakingProps={listing0} titleProps={listing0} />
      </div>
    </>
  );
};

export default LaunchPadChainPage;
