import React, { useState } from 'react';
import { ethers } from 'ethers';

import { MDBCollapse, MDBTooltip } from 'mdb-react-ui-kit';
import { Textfit } from 'react-textfit';

import numeral from 'numeral';

import { useBlockNumber } from '../library/providers/BlockNumberProvider';
import { getExplorerCountdownLink } from '../library/helpers/chains';

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
              <p>
                <span style={{ color: `#28CCAB` }}>EARN</span>{' '}
                {pool.rewardSymbols && pool.rewardSymbols[0]
                  ? pool.rewardSymbols[0]
                  : pool.rewardTokens[0].symbol}
                {pool.rewardTokens[1] ? (
                  <>
                    {pool.rewardSymbols && pool.rewardSymbols[1] ? (
                      <> + {pool.rewardSymbols[1]}</>
                    ) : (
                      <> + {pool.rewardTokens[1].symbol}</>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </p>
              <Textfit mode="single">
                <p>
                  <span className="text-white1">STAKE</span>{' '}
                  {pool.stakeSymbol ? pool.stakeSymbol : pool.stakeToken.symbol}
                </p>
              </Textfit>
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
                title={'Rewards Earned From Staking ' + pool.stakeToken.symbol}
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
            <span>APR</span>
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
              {pool.stakeSymbol ? pool.stakeSymbol : pool.stakeToken.symbol}
            </p>
            <span>
              {numeral(
                ethers.utils.formatEther(pool.stakeToken.totalStakedUSD),
              ).format('$0,0.00')}
            </span>
          </div>
        </td>
        <td className="desktop-view">
          <div className="apy-content d-flex justify-content-between">
            <span>
              {(
                pool.usesBlocks
                  ? pool.end > currentBlock
                  : pool.end * 1000 > Date.now()
              )
                ? (
                    pool.usesBlocks
                      ? currentBlock < pool.start
                      : Date.now() < pool.start * 1000
                  )
                  ? 'Starts in'
                  : 'Ends in'
                : ''}{' '}
              {pool.usesBlocks && (
                <a
                  href={getExplorerCountdownLink(
                    chainId,
                    currentBlock < pool.start ? pool.start : pool.end,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={StopwatchIcon} alt="" className="ms-1" />
                </a>
              )}
            </span>
            <p>
              {(
                pool.usesBlocks
                  ? pool.end > currentBlock
                  : pool.end * 1000 > Date.now()
              ) ? (
                pool.usesBlocks ? (
                  <>
                    {numeral(
                      currentBlock < pool.start
                        ? pool.start - currentBlock
                        : pool.end - currentBlock,
                    ).format('0,0')}
                    <small> blocks</small>
                  </>
                ) : (
                  <>
                    {numeral(
                      Date.now() < pool.start * 1000
                        ? (pool.start * 1000 - Date.now()) / 1000
                        : (pool.end * 1000 - Date.now()) / 1000,
                    ).format('0,0')}
                    <small> seconds</small>
                  </>
                )
              ) : (
                'FINISHED'
              )}{' '}
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
                    <span className="pb-0 pb-sm-2">Harvest</span>
                    <button className="join-btn">Join</button>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="action-item">
                    <span className="pb-0 pb-sm-2">Stake</span>
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
                    {(
                      pool.usesBlocks
                        ? pool.end > currentBlock
                        : pool.end * 1000 > Date.now()
                    )
                      ? (
                          pool.usesBlocks
                            ? currentBlock < pool.start
                            : Date.now() < pool.end * 1000
                        )
                        ? 'Starts in'
                        : 'Ends in'
                      : ''}{' '}
                    {pool.usesBlocks && (
                      <a
                        href={getExplorerCountdownLink(
                          chainId,
                          currentBlock < pool.start ? pool.start : pool.end,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={StopwatchIcon} alt="" className="ms-1" />
                      </a>
                    )}
                  </span>
                  <p>
                    {(
                      pool.usesBlocks
                        ? pool.end > currentBlock
                        : pool.end * 1000 > Date.now()
                    )
                      ? pool.usesBlocks
                        ? numeral(
                            currentBlock < pool.start
                              ? pool.start - currentBlock
                              : pool.end - currentBlock,
                          ).format('0,0') + ' blocks'
                        : numeral(
                            Date.now() < pool.start * 1000
                              ? (pool.start * 1000 - Date.now()) / 1000
                              : (pool.end * 1000 - Date.now()) / 1000,
                          ).format('0,0') + ' seconds'
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
