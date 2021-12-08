import React, { useState } from 'react';
import {
  MDBTable,
  MDBTableBody,
  MDBSwitch,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { ethers } from 'ethers';
import numeral from 'numeral';

import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';

import { CHAIN_NAMES, CHAIN_ETHER } from '../library/constants/chains';
import { CHAIN_INFO } from '../configs';

import useGASTokenMarketCap from '../hooks/useGASTokenMarketCap';
import useGASTokenRewardsInfo from '../hooks/useGASTokenRewardsInfo';

import HubCard from '../components/hubCard';
import GridHubCard from '../components/GridhubCard';
// import StackModal from '../components/stakeModal';
import GasIcon from '../assets/gas.svg';
import DollarIcon from '../assets/dollar.svg';

export const RewardsHubPage = () => {
  const { readOnlyChainIds } = useConfig();
  const { currentChainId, setCurrentChainId } = useWeb3ConnectionsContext();
  const chainData = CHAIN_INFO[currentChainId];

  const marketCap = useGASTokenMarketCap();
  const { gasTokenBalance, accountRewards, totalRewards, gasTokenBalanceUSD } =
    useGASTokenRewardsInfo();

  const [isFilterShow, setIsFilterShow] = useState(false);
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);
  const [isCardGride, setIsCardGride] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const toggleFilter = () => {
    setIsFilterShow(!isFilterShow);
  };

  const toggleStakeModal = () => {
    setIsStakeModalOpen(!isStakeModalOpen);
  };

  const switchNetwork = (e: any) => {
    setCurrentChainId(e.target.value);
  };

  return (
    <>
      <div className="rewards-first-block">
        <div className="rewards-title-block">
          <div className="rewards-title">
            <h2>
              <img
                src={chainData.tokenImage.replace('/public/', '/')}
                alt=""
                className="me-3"
              />
              {CHAIN_NAMES[currentChainId]}
            </h2>
            <select
              className="custom-select d-none d-lg-block"
              onChange={switchNetwork}
            >
              <option value="">Switch Network</option>
              {(readOnlyChainIds || []).map((chainId) => {
                return (
                  chainId != currentChainId &&
                  CHAIN_INFO[chainId].launched && (
                    <option key={`switch-chain-${chainId}`} value={chainId}>
                      {CHAIN_NAMES[chainId]}
                    </option>
                  )
                );
              })}
            </select>
          </div>
          <div className="total-rewards-value">
            <select
              className="custom-select d-block d-lg-none m-0"
              onChange={switchNetwork}
            >
              <option value="">Switch Network</option>
              {(readOnlyChainIds || []).map((chainId) => {
                return (
                  chainId != currentChainId &&
                  CHAIN_INFO[chainId].launched && (
                    <option key={`switch-chain-${chainId}`} value={chainId}>
                      {CHAIN_NAMES[chainId]}
                    </option>
                  )
                );
              })}
            </select>
            <div className="amount-details">
              <div className="amount-tvl">
                <small>TVL</small>
                <p>$11,234,567</p>
              </div>
              <div className="amount-market-cap">
                <small>USD MARKET CAP</small>
                <p>
                  {numeral(ethers.utils.formatEther(marketCap)).format('$0,0')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rewards-items">
          <div className="row">
            <div className="col-6 col-sm-6 col-xl-3">
              <div className="rewards-item">
                <div className="rewards-content">
                  <small>My Token Balance</small>
                  <p>
                    {numeral(ethers.utils.formatEther(gasTokenBalance)).format(
                      '0,0',
                    )}
                  </p>
                </div>
                <div className="rewards-icon">
                  <img src={GasIcon} alt="" />
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-xl-3">
              <div className="rewards-item">
                <div className="rewards-content">
                  <small>My Token Value</small>
                  <p>
                    {numeral(
                      ethers.utils.formatEther(gasTokenBalanceUSD),
                    ).format('$0,0.00')}
                  </p>
                </div>
                <div className="rewards-icon">
                  <img src={DollarIcon} alt="" />
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-xl-3">
              <div className="rewards-item">
                <div className="rewards-content">
                  <small>My GAS Rewards</small>
                  <p>
                    {numeral(ethers.utils.formatEther(accountRewards)).format(
                      '0,0.0000',
                    )}{' '}
                    {CHAIN_ETHER[currentChainId]}
                  </p>
                </div>
                <div className="rewards-icon">
                  <img src={DollarIcon} alt="" />
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-xl-3">
              <div className="rewards-item">
                <div className="rewards-content">
                  <small>Total GAS Rewards</small>
                  <p>
                    {numeral(ethers.utils.formatEther(totalRewards)).format(
                      '0,0.0000',
                    )}{' '}
                    {CHAIN_ETHER[currentChainId]}
                  </p>
                </div>
                <div className="rewards-icon">
                  <img src={DollarIcon} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rewards-second-block">
        <div className="title-block">
          <h2>
            Fuel Tanks <span>Earn Rewards</span>
          </h2>
          <p>Stake tokens earn rewards. Lower gas, high APR, and low risk.</p>
        </div>
        <div className="title-grid-list">
          <div className="row align-items-center">
            <div className="col-md-7 col-xl-7 col-xxl-6">
              <div className="grid-block">
                <div className="d-flex d-md-none mobile-filter">
                  <span className="filter-title">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5 12H5V11.5C5 11.225 4.775 11 4.5 11H3.5C3.225 11 3 11.225 3 11.5V12H0.5C0.225 12 0 12.225 0 12.5V13.5C0 13.775 0.225 14 0.5 14H3V14.5C3 14.775 3.225 15 3.5 15H4.5C4.775 15 5 14.775 5 14.5V14H15.5C15.775 14 16 13.775 16 13.5V12.5C16 12.225 15.775 12 15.5 12ZM15.5 7H13V6.5C13 6.225 12.775 6 12.5 6H11.5C11.225 6 11 6.225 11 6.5V7H0.5C0.225 7 0 7.225 0 7.5V8.5C0 8.775 0.225 9 0.5 9H11V9.5C11 9.775 11.225 10 11.5 10H12.5C12.775 10 13 9.775 13 9.5V9H15.5C15.775 9 16 8.775 16 8.5V7.5C16 7.225 15.775 7 15.5 7ZM15.5 2H9V1.5C9 1.225 8.775 1 8.5 1H7.5C7.225 1 7 1.225 7 1.5V2H0.5C0.225 2 0 2.225 0 2.5V3.5C0 3.775 0.225 4 0.5 4H7V4.5C7 4.775 7.225 5 7.5 5H8.5C8.775 5 9 4.775 9 4.5V4H15.5C15.775 4 16 3.775 16 3.5V2.5C16 2.225 15.775 2 15.5 2Z"
                        fill="#28CCAB"
                      />
                    </svg>
                    Filters
                  </span>
                  <span onClick={toggleFilter}>
                    {isFilterShow ? 'HIDE' : 'SHOW'}
                  </span>
                </div>
                <div className="grid-list-icon d-none d-md-flex">
                  <span
                    className={isCardGride ? '' : 'active'}
                    onClick={() => setIsCardGride(false)}
                  >
                    <svg
                      width="18"
                      height="12"
                      viewBox="0 0 18 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.600006 11C0.600006 11.5523 1.04772 12 1.60001 12H16.4C16.9523 12 17.4 11.5523 17.4 11V10.6C17.4 10.0477 16.9523 9.6 16.4 9.6H1.60001C1.04772 9.6 0.600006 10.0477 0.600006 10.6V11ZM1.60001 0C1.04772 0 0.600006 0.447715 0.600006 1V1.4C0.600006 1.95229 1.04772 2.4 1.60001 2.4H16.4C16.9523 2.4 17.4 1.95228 17.4 1.4V0.999999C17.4 0.447715 16.9523 0 16.4 0H1.60001ZM0.600006 6.2C0.600006 6.75229 1.04772 7.2 1.60001 7.2H16.4C16.9523 7.2 17.4 6.75228 17.4 6.2V5.8C17.4 5.24771 16.9523 4.8 16.4 4.8H1.60001C1.04772 4.8 0.600006 5.24772 0.600006 5.8V6.2Z"
                        fill="#8A92A6"
                      />
                    </svg>
                  </span>
                  <span
                    className={isCardGride ? 'active' : ''}
                    onClick={() => setIsCardGride(true)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 1C0 0.447715 0.447715 0 1 0H3C3.55228 0 4 0.447715 4 1V3C4 3.55228 3.55228 4 3 4H1C0.447715 4 0 3.55228 0 3V1Z"
                        fill="#8A92A6"
                      />
                      <path
                        d="M0 7C0 6.44772 0.447715 6 1 6H3C3.55228 6 4 6.44772 4 7V9C4 9.55228 3.55228 10 3 10H1C0.447715 10 0 9.55228 0 9V7Z"
                        fill="#8A92A6"
                      />
                      <path
                        d="M4 13C4 12.4477 3.55228 12 3 12H1C0.447715 12 0 12.4477 0 13V15C0 15.5523 0.447715 16 1 16H3C3.55228 16 4 15.5523 4 15V13Z"
                        fill="#8A92A6"
                      />
                      <path
                        d="M6 1C6 0.447715 6.44772 0 7 0H9C9.55228 0 10 0.447715 10 1V3C10 3.55228 9.55228 4 9 4H7C6.44772 4 6 3.55228 6 3V1Z"
                        fill="#8A92A6"
                      />
                      <path
                        d="M10 7C10 6.44772 9.55228 6 9 6H7C6.44772 6 6 6.44772 6 7V9C6 9.55228 6.44772 10 7 10H9C9.55228 10 10 9.55228 10 9V7Z"
                        fill="#8A92A6"
                      />
                      <path
                        d="M6 13C6 12.4477 6.44772 12 7 12H9C9.55228 12 10 12.4477 10 13V15C10 15.5523 9.55228 16 9 16H7C6.44772 16 6 15.5523 6 15V13Z"
                        fill="#8A92A6"
                      />
                      <path
                        d="M16 1C16 0.447715 15.5523 0 15 0H13C12.4477 0 12 0.447715 12 1V3C12 3.55228 12.4477 4 13 4H15C15.5523 4 16 3.55228 16 3V1Z"
                        fill="#8A92A6"
                      />
                      <path
                        d="M12 7C12 6.44772 12.4477 6 13 6H15C15.5523 6 16 6.44772 16 7V9C16 9.55228 15.5523 10 15 10H13C12.4477 10 12 9.55228 12 9V7Z"
                        fill="#8A92A6"
                      />
                      <path
                        d="M16 13C16 12.4477 15.5523 12 15 12H13C12.4477 12 12 12.4477 12 13V15C12 15.5523 12.4477 16 13 16H15C15.5523 16 16 15.5523 16 15V13Z"
                        fill="#8A92A6"
                      />
                    </svg>
                  </span>
                </div>
                <div className="grid-switch-icon d-none d-md-block">
                  <MDBSwitch id="flexSwitchCheckDefault" label="Staked only" />
                </div>
                <div className="grid-live-icon d-none d-md-inline-block">
                  <span
                    className={isLive ? '' : 'active'}
                    onClick={() => setIsLive(false)}
                  >
                    Live
                  </span>
                  <span
                    className={isLive ? 'active' : ''}
                    onClick={() => setIsLive(true)}
                  >
                    Finished
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-5 col-xl-5 col-xxl-6">
              <MDBCollapse show={isFilterShow} className="sort-search-wrapper">
                <div className="sort-search-block">
                  <div className="d-flex d-md-none inner-mobile-soft">
                    <div className="grid-switch-icon">
                      <MDBSwitch
                        id="flexSwitchCheckDefault"
                        label="Staked only"
                      />
                    </div>
                    <div className="grid-live-icon">
                      <span className="active">Live</span>
                      <span>Finished</span>
                    </div>
                  </div>
                  <div className="sort-item">
                    <span>SORT BY</span>
                    <select className="custom-select">
                      <option value="APR">APR</option>
                      <option value="APR1">APR1</option>
                    </select>
                  </div>
                  <div className="search-item">
                    <span>SEARCH</span>
                    <select className="custom-select">
                      <option value="Search Gas Tanks">Search Gas Tanks</option>
                      <option value="APR1">APR1</option>
                    </select>
                  </div>
                  <div className="d-block d-md-none">
                    <button className="filter-btn">Apply Filters</button>
                  </div>
                </div>
              </MDBCollapse>
            </div>
          </div>
        </div>
        {isCardGride ? (
          <div className="rewards-grid-block">
            <div className="row">
              <GridHubCard toggleStakeModal={toggleStakeModal} />
              <GridHubCard toggleStakeModal={toggleStakeModal} />
              <GridHubCard toggleStakeModal={toggleStakeModal} />
              <GridHubCard toggleStakeModal={toggleStakeModal} />
              <GridHubCard toggleStakeModal={toggleStakeModal} />
              <GridHubCard toggleStakeModal={toggleStakeModal} />
              <GridHubCard toggleStakeModal={toggleStakeModal} />
              <GridHubCard toggleStakeModal={toggleStakeModal} />
            </div>
          </div>
        ) : (
          <div className="rewards-table">
            <MDBTable responsive="xl">
              <MDBTableBody>
                <HubCard />
                <HubCard />
                <HubCard />
                <HubCard />
              </MDBTableBody>
            </MDBTable>
          </div>
        )}
      </div>
      {/* <StackModal
        isStakeModalOpen={isStakeModalOpen}
        toggleStakeModal={toggleStakeModal}
      /> */}
    </>
  );
};

export default RewardsHubPage;
