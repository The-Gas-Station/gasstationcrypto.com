import React, { useState } from 'react';
import { ethers } from 'ethers';

import { MDBCollapse } from 'mdb-react-ui-kit';

import numeral from 'numeral';

import { useBlockNumber } from '../library/providers/BlockNumberProvider';

import StopwatchIcon from '../assets/icon-stopwatch.svg';
import DollarGas from '../assets/dollar-gas.svg';
import Usdc from '../assets/usdc.png';

import { PoolResult } from '../hooks/Pools';

type toggleProps = {
  toggleStakeModal: any;
  chainId: number;
  pool: PoolResult;
};

export const GridHubCard = ({
  toggleStakeModal,
  chainId,
  pool,
}: toggleProps) => {
  const currentBlock = useBlockNumber(chainId) ?? 0;

  const [harvesting, setHarvesting] = useState(false);
  const _harvest = pool.useHarvestAction(pool);

  const harvest = () => {
    setHarvesting(true);
    _harvest().finally(() => setHarvesting(false));
  };

  const hasHarvest = pool.rewardTokens[0].pendingRewards.gt(0);
  const isStaked = pool.stakeToken.staked.gt(0);

  const [showShow, setShowShow] = useState(false);

  const toggleShow = () => {
    setShowShow(!showShow);
  };

  return (
    <>
      <div className="col-sm-6 col-lg-4 col-xl-3">
        <div className="rewards-grid-item">
          <div className="card-sub-header">
            <div className="card-left-text">
              <h2>{pool.name}</h2>
              <p>
                <span style={{ color: `#28CCAB` }}>EARN</span>{' '}
                {pool.rewardTokens[0].symbol}
                {pool.rewardTokens[1] ? (
                  <> + {pool.rewardTokens[1].symbol}</>
                ) : (
                  <></>
                )}
              </p>
              <p>
                <span className="text-white1">STAKE</span>{' '}
                {pool.stakeToken.symbol}
              </p>
            </div>
            <div className="card-right-img">
              <img src={DollarGas} alt="" />
            </div>
          </div>
          <div className="card-body-content">
            <div className="title">
              <span>APY</span>
              <span>{numeral(pool.apr).format('0.00%')}</span>
            </div>
            <div className="reward-money">
              <div className="reward-list">
                <h5>
                  <span>EARNED</span>REWARDS
                </h5>
                <div className="reward-content">
                  <div className="reward-items">
                    <div className="reward-item">
                      <img src={Usdc} alt="" />
                      <p>
                        {numeral(
                          ethers.utils.formatEther(
                            pool.rewardTokens[0].pendingRewards,
                          ),
                        ).format('0,0.00')}{' '}
                        {pool.rewardTokens[0].symbol}
                        <br />
                        <span>
                          ~
                          {numeral(
                            ethers.utils.formatEther(
                              pool.rewardTokens[0].pendingRewardsUSD,
                            ),
                          ).format('$0,0.00')}
                        </span>
                      </p>
                    </div>
                    {pool.rewardTokens[1] ? (
                      <div className="reward-item">
                        <img src={Usdc} alt="" />
                        <p>
                          {numeral(
                            ethers.utils.formatEther(
                              pool.rewardTokens[1].pendingRewards,
                            ),
                          ).format('0,0.00')}{' '}
                          {pool.rewardTokens[1].symbol}
                          <br />{' '}
                          <span>
                            ~
                            {numeral(
                              ethers.utils.formatEther(
                                pool.rewardTokens[0].pendingRewardsUSD,
                              ),
                            ).format('$0,0.00')}
                          </span>
                        </p>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {hasHarvest ? (
                    <button
                      className="join-btn"
                      onClick={harvest}
                      disabled={harvesting}
                    >
                      {harvesting ? 'Harvesting...' : 'Harvest'}
                    </button>
                  ) : (
                    <div className="harvest-btn">
                      {harvesting ? 'Harvesting...' : 'Harvest'}
                    </div>
                  )}
                </div>
              </div>

              {!isStaked ? (
                <div className="action-item">
                  <button className="join-btn" onClick={toggleStakeModal}>
                    Stake
                  </button>
                </div>
              ) : (
                <div className="reward-stake-block">
                  <h5>STAKED</h5>
                  <div className="reward-stake-item">
                    <div className="reward-item mb-0">
                      <img src={Usdc} alt="" />
                      <p>
                        {numeral(
                          ethers.utils.formatEther(pool.stakeToken.staked),
                        ).format('0,0.00')}{' '}
                        {pool.stakeToken.symbol}
                        <br />{' '}
                        <span>
                          ~
                          {numeral(
                            ethers.utils.formatEther(pool.stakeToken.stakedUSD),
                          ).format('$0,0.00')}
                        </span>
                      </p>
                    </div>
                    <div className="reward-plus-minus">
                      <span>
                        <svg
                          width="14"
                          height="4"
                          viewBox="0 0 14 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 0.5H1C0.447812 0.5 0 0.947812 0 1.5V2.5C0 3.05219 0.447812 3.5 1 3.5H13C13.5522 3.5 14 3.05219 14 2.5V1.5C14 0.947812 13.5522 0.5 13 0.5Z"
                            fill="#28CCAB"
                          />
                        </svg>
                      </span>
                      <span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 5.5H8.5V1C8.5 0.447812 8.05219 0 7.5 0H6.5C5.94781 0 5.5 0.447812 5.5 1V5.5H1C0.447812 5.5 0 5.94781 0 6.5V7.5C0 8.05219 0.447812 8.5 1 8.5H5.5V13C5.5 13.5522 5.94781 14 6.5 14H7.5C8.05219 14 8.5 13.5522 8.5 13V8.5H13C13.5522 8.5 14 8.05219 14 7.5V6.5C14 5.94781 13.5522 5.5 13 5.5Z"
                            fill="#28CCAB"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div className={`grid-dropdown-title ${showShow ? 'open' : ''}`}>
                <span onClick={toggleShow}>
                  {showShow ? 'Hide' : 'Details'}
                </span>
              </div>

              <MDBCollapse show={showShow} className="grid-dropdown-wrapper">
                <div className="grid-dropdown">
                  <div className="apy-content">
                    <span>Total Staked</span>
                    <p>
                      {numeral(
                        ethers.utils.formatEther(pool.stakeToken.totalStaked),
                      ).format('0,0.00')}{' '}
                      {pool.stakeToken.symbol}
                    </p>
                  </div>
                  <div className="apy-content">
                    <span>
                      {pool.depositBurnFee > 0 && pool.depositFee > 0
                        ? 'Burn/Deposit'
                        : pool.depositBurnFee > 0
                        ? 'Burn'
                        : 'Deposit'}{' '}
                      Fee
                    </span>
                    <p>
                      {numeral(
                        (pool.depositBurnFee + pool.depositFee) / 10000.0,
                      ).format('0.00%')}
                    </p>
                  </div>
                  <div className="apy-content">
                    <span>
                      {pool.endBlock > currentBlock
                        ? currentBlock < pool.startBlock
                          ? 'Starts in'
                          : 'Ends in'
                        : ''}{' '}
                      <img src={StopwatchIcon} alt="" className="ms-1" />
                    </span>
                    <p>
                      {pool.endBlock > currentBlock ? (
                        <>
                          {numeral(
                            currentBlock < pool.startBlock
                              ? pool.startBlock - currentBlock
                              : pool.endBlock - currentBlock,
                          ).format('0,0')}{' '}
                          <small>blocks</small>
                        </>
                      ) : (
                        'FINISHED'
                      )}{' '}
                    </p>
                  </div>
                </div>
              </MDBCollapse>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GridHubCard;
