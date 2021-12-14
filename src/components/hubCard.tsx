import React, { useState } from 'react';
import { ethers } from 'ethers';

import { MDBCollapse, MDBTooltip } from 'mdb-react-ui-kit';

import numeral from 'numeral';

import { useBlockNumber } from '../library/providers/BlockNumberProvider';

import GasIcon from '../assets/gas.svg';
import QuestionIcon from '../assets/icons-question.svg';
import StopwatchIcon from '../assets/icon-stopwatch.svg';

import { PoolResult } from '../hooks/Pools';
// import Metamask from '../assets/wallets/metamask.png';

export const HubCard = ({
  chainId,
  pool,
}: {
  chainId: number;
  pool: PoolResult;
}) => {
  const currentBlock = useBlockNumber(chainId) ?? 0;

  //   const [harvesting, setHarvesting] = useState(false);
  //   const _harvest = pool.useHarvestAction(pool);

  //   const harvest = () => {
  //     setHarvesting(true);
  //     _harvest().finally(() => setHarvesting(false));
  //   };

  //   const hasHarvest = pool.rewardTokens[0].pendingRewards.gt(0);
  //   const isStaked = pool.stakeToken.staked.gt(0);

  const [showShow, setShowShow] = useState(false);

  const toggleShow = () => {
    setShowShow(!showShow);
  };

  return (
    <>
      <tr>
        <td>
          <div className="rewards-table-title">
            <div className="title-img">
              <img src={GasIcon} alt="" />
            </div>
            <div className="title">
              <h3>{pool.name}</h3>
              <p className="d-none d-sm-block">
                Stake {pool.stakeToken.symbol}
                <br /> Earn {pool.rewardTokens[0].symbol}
                {pool.rewardTokens[1] ? (
                  <> + {pool.rewardTokens[1].symbol}</>
                ) : (
                  <></>
                )}
              </p>
            </div>
          </div>
        </td>
        <td>
          <div className="usd-content">
            <span>
              {pool.rewardTokens[0].symbol}
              {pool.rewardTokens[1] ? (
                <> + {pool.rewardTokens[1].symbol}</>
              ) : (
                <></>
              )}{' '}
              Earned
              <MDBTooltip
                tag="a"
                wrapperProps={{ href: '#' }}
                title="Hi! I'm a tooltip!"
              >
                {' '}
                <img src={QuestionIcon} alt="" className="ms-1" />
              </MDBTooltip>
            </span>
            <p className="text-green">
              {numeral(
                ethers.utils.formatEther(pool.rewardTokens[0].pendingRewards),
              ).format('0,0.00')}{' '}
              {pool.rewardTokens[0].symbol}
            </p>
            <span>
              ~
              {numeral(
                ethers.utils.formatEther(
                  pool.rewardTokens[0].pendingRewardsUSD,
                ),
              ).format('$0,0.00')}
            </span>
          </div>
        </td>
        <td>
          <div className="apy-content">
            <span>APY</span>
            <p>{numeral(pool.apr).format('0.00%')}</p>
          </div>
        </td>
        <td className="desktop-view">
          <div className="apy-content">
            <span>Total Staked</span>
            <p>
              {numeral(
                ethers.utils.formatEther(pool.stakeToken.totalStaked),
              ).format('0,0.00')}{' '}
              {pool.stakeToken.symbol}
            </p>
            <span>
              {numeral(
                ethers.utils.formatEther(pool.stakeToken.totalStakedUSD),
              ).format('$0,0.00')}
            </span>
          </div>
        </td>
        <td className="desktop-view">
          <div className="apy-content">
            <span>
              {pool.endBlock > currentBlock
                ? currentBlock < pool.startBlock
                  ? 'Starts in'
                  : 'Ends in'
                : ''}
            </span>
            <p>
              <img src={StopwatchIcon} alt="" className="me-1" />
              {pool.endBlock > currentBlock
                ? numeral(
                    currentBlock < pool.startBlock
                      ? pool.startBlock - currentBlock
                      : pool.endBlock - currentBlock,
                  ).format('0,0') + ' blocks'
                : 'FINISHED'}
            </p>
          </div>
        </td>
        <td className="desktop-view">
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
        </td>
        <td>
          <div className="action-btn-dropdown">
            <div
              className={`title-box ${showShow ? 'open' : ''}`}
              onClick={toggleShow}
            >
              <span className="d-none d-sm-block mt-0">
                {showShow ? 'Hide' : 'Details'}
              </span>
            </div>
          </div>
        </td>
      </tr>
      <tr className="action-dropdown-box">
        <th colSpan={7}>
          <MDBCollapse className="action-dropdown-inner" show={showShow}>
            <div className="action-dropdown">
              <p
                className="d-block d-sm-none mb-2"
                style={{ color: `#8A92A6` }}
              >
                Stake BNB-bscGAS ApeLP Earn USDC +bscGAS
              </p>
              {/* <p className="action-title">
                Add Token to BCS Mainnet wallet
                <img
                  src={Metamask}
                  alt=""
                  className="ms-2"
                  style={{ maxWidth: `16px` }}
                />
              </p> */}
              <div className="row">
                <div className="col-md-4">
                  <div className="action-item recent-item">
                    <div className="action-content">
                      <span className="text-pink">
                        RECENT {pool.rewardTokens[0].symbol} EARNED
                      </span>
                      <p>
                        {numeral(
                          ethers.utils.formatEther(
                            pool.rewardTokens[0].pendingRewards,
                          ),
                        ).format('0,0.00')}{' '}
                        {pool.rewardTokens[0].symbol}
                      </p>
                      <span>
                        ~
                        {numeral(
                          ethers.utils.formatEther(
                            pool.rewardTokens[0].pendingRewardsUSD,
                          ),
                        ).format('$0,0.00')}
                      </span>
                    </div>
                    <div className="action-content">
                      {pool.rewardTokens[1] ? (
                        <>
                          <span className="text-pink">
                            RECENT {pool.rewardTokens[1].symbol} EARNED
                          </span>
                          <p>
                            {' '}
                            {numeral(
                              ethers.utils.formatEther(
                                pool.rewardTokens[1].pendingRewards,
                              ),
                            ).format('0,0.00')}{' '}
                            {pool.rewardTokens[1].symbol}
                          </p>
                          <span>
                            ~
                            {numeral(
                              ethers.utils.formatEther(
                                pool.rewardTokens[1].pendingRewardsUSD,
                              ),
                            ).format('$0,0.00')}
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                      {/* <span>
                        0.1%{' '}
                        <div className="text-decoration-underline">
                          unstaking fee
                        </div>{' '}
                        until
                      </span>
                      <span>2d : 22h : 11m</span>
                      <span>
                        <div className="text-decoration-underline">
                          Performance Fee
                        </div>{' '}
                        5%
                      </span> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="action-item">
                    <span className="pb-0 pb-sm-2">PRESALE MINING</span>
                    <button className="join-btn">Join</button>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="action-item">
                    <span className="pb-0 pb-sm-2">PRESALE MINING</span>
                    <button className="join-btn">Enable</button>
                  </div>
                </div>
              </div>
              <div className="d-block d-sm-none mobile-apy-content">
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
                    {pool.endBlock > currentBlock
                      ? currentBlock < pool.startBlock
                        ? 'Starts in'
                        : 'Ends in'
                      : ''}{' '}
                    <img src={StopwatchIcon} alt="" className="ms-1" />
                  </span>
                  <p>
                    {pool.endBlock > currentBlock
                      ? numeral(
                          currentBlock < pool.startBlock
                            ? pool.startBlock - currentBlock
                            : pool.endBlock - currentBlock,
                        ).format('0,0') + ' blocks'
                      : 'FINISHED'}
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
              </div>
            </div>
          </MDBCollapse>
        </th>
      </tr>
    </>
  );
};

export default HubCard;
