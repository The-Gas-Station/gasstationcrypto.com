import React from 'react';
import PppCard from '../components/pppCard';
import rocket from '../assets/rocket.svg';

export const LaunchPadChainPage = () => {
  return (
    <>
      <div className="flex-row d-flex galaxy">
        <div className="stars stars2 stars3"></div>
        <img src={rocket} />
        <h1>Project Propultion Pad</h1>
      </div>
      <div className="flex-row d-flex">
        <div className="col-lg-6">
          <div className="flex-row d-flex">
            <h2>CrowdFunding</h2>
            <h3>Support New Projects</h3>
          </div>
          <p>
            The Gas Station launchpad is the destination IDO for projects to
            fuel up for launch
          </p>
        </div>
        <div className="col-lg-3" />
        <div className="col-lg-3">
          <button className="button1">+ Apply as a Project</button>
        </div>
      </div>
      <div className="flex-row d-flex">
        <button className="button1">Yo</button>
        <button className="button1">Yo</button>
        <button className="button1">Yo</button>
      </div>
      <div className="flex-row d-flex flex-wrap justify-content-center">
        <PppCard />
      </div>
    </>
  );
};

export default LaunchPadChainPage;
