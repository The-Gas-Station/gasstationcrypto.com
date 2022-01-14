import React, { useState } from 'react';
import { ethers } from 'ethers';

import { MDBCollapse } from 'mdb-react-ui-kit';

import numeral from 'numeral';

import { useBlockNumber } from '../library/providers/BlockNumberProvider';
import useEthers from '../library/hooks/useEthers';
import { getExplorerCountdownLink } from '../library/helpers/chains';

import StopwatchIcon from '../assets/icon-stopwatch.svg';

import { PoolResult } from '../hooks/Pools';
import {
  CHAIN_NAMES,
  ChainId,
  CHAIN_ETHER,
  EXPLORER_URLS,
  RPC_URLS,
} from '../library/constants/chains';
import { PoolType } from '../configs';

type toggleProps = {
  showStakeModal: any;
  chainId: ChainId;
  pool: PoolResult;
};

export const GridHubCard = ({ showStakeModal, chainId, pool }: toggleProps) => {
  const {
    activateBrowserWallet,
    account,
    chainId: connectedChainId,
  } = useEthers();

  const currentBlock = useBlockNumber(chainId) ?? 0;

  const [harvesting, setHarvesting] = useState(false);
  const _harvest = pool.useHarvestAction(pool);

  const harvest = () => {
    setHarvesting(true);
    _harvest().finally(() => setHarvesting(false));
  };

  const [approving, setApproving] = useState(false);
  const _approve = pool.useApproveAction(pool);

  const approve = () => {
    setApproving(true);
    _approve(ethers.constants.MaxUint256).finally(() => setApproving(false));
  };

  const _withdraw = pool.useWithdrawAction(pool);

  const withdrawAll = () => {
    _withdraw(pool.stakeToken.staked);
  };

  const hasHarvest = pool.rewardTokens[0].pendingRewards.gt(0);
  const isStaked = pool.stakeToken.staked.gt(0);
  const isApproved = pool.stakeToken.approved.gt(pool.stakeToken.balance);
  const isFinished = pool.usesBlocks
    ? pool.end < currentBlock
    : pool.end * 1000 < Date.now();

  const connect = async () => {
    try {
      await activateBrowserWallet((e) => {
        console.log(e);
      }, true);
    } catch (e) {
      console.log(e);
    }
  };

  const forceChain = async () => {
    try {
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (e: any) {
      if (e.code == 4902) {
        await (window as any).ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: CHAIN_NAMES[chainId],
              nativeCurrency: {
                name: CHAIN_ETHER[chainId],
                symbol: CHAIN_ETHER[chainId],
                decimals: 18,
              },
              rpcUrls: RPC_URLS[chainId],
              blockExplorerUrls: [EXPLORER_URLS[chainId]],
            },
          ],
        });
      }
    }
  };

  const [showShow, setShowShow] = useState(false);

  const toggleShow = () => {
    setShowShow(!showShow);
  };

  return (
    <>
      <div className="col-sm-6 col-lg-4 col-xl-4 grid-hub-card">
        <div className="rewards-grid-item">
          <div className="card-sub-header">
            <div className="card-left-text">
              <h2>{pool.name}</h2>
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
              <p>
                <span className="text-white1">STAKE</span>{' '}
                {pool.stakeSymbol ? pool.stakeSymbol : pool.stakeToken.symbol}
              </p>
            </div>
            <div className="card-right-img">
              <img
                src={pool?.stakeIcon.replace('/public/', '/')}
                alt=""
                style={{ maxHeight: 55 }}
              />
            </div>
          </div>
          <div className="card-body-content">
            <div className="title">
              <span>{pool.apr ? 'APR' : 'Total Rewards/Day'}</span>
              <span>
                {numeral(
                  isFinished
                    ? '0'
                    : pool.apr
                    ? pool.apr
                    : ethers.utils.formatEther(
                        pool.rewardTokens[0].rewardsPerDay,
                      ),
                ).format(isFinished || pool.apr ? '0.00%' : '0,0.0')}
              </span>
            </div>
            <div className="reward-money">
              <div className="reward-list">
                <h5>
                  <span>EARNED</span>REWARDS
                </h5>
                <div className="reward-content">
                  <div className="reward-items">
                    <div className="reward-item">
                      <img
                        src={pool?.reward0Icon.replace('/public/', '/')}
                        alt=""
                      />
                      <p>
                        {numeral(
                          ethers.utils.formatEther(
                            pool.rewardTokens[0].pendingRewards,
                          ),
                        ).format('0,0.00')}{' '}
                        {pool.rewardSymbols && pool.rewardSymbols[0]
                          ? pool.rewardSymbols[0]
                          : pool.rewardTokens[0].symbol}
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
                    {pool.type == PoolType.DoubleV1 ||
                    pool.type == PoolType.DoubleV2 ? (
                      <div className="reward-item">
                        <img
                          src={pool?.reward1Icon.replace('/public/', '/')}
                          alt=""
                        />
                        <p>
                          {numeral(
                            ethers.utils.formatEther(
                              pool.rewardTokens[1].pendingRewards,
                            ),
                          ).format('0,0.00')}{' '}
                          {pool.rewardSymbols && pool.rewardSymbols[1]
                            ? pool.rewardSymbols[1]
                            : pool.rewardTokens[1].symbol}
                          <br />{' '}
                          <span>
                            ~
                            {numeral(
                              ethers.utils.formatEther(
                                pool.rewardTokens[1].pendingRewardsUSD,
                              ),
                            ).format('$0,0.00')}
                          </span>
                        </p>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {account && chainId == connectedChainId && hasHarvest ? (
                    <button
                      className="join-btn"
                      onClick={harvest}
                      disabled={harvesting}
                    >
                      {harvesting ? 'Harvesting...' : 'Harvest'}
                    </button>
                  ) : (
                    <div className="harvest-btn">Harvest</div>
                  )}
                </div>
              </div>

              {!account ? (
                <div className="action-item">
                  <button className="join-btn" onClick={connect}>
                    Connect
                  </button>
                </div>
              ) : chainId != connectedChainId ? (
                <div className="action-item">
                  <button className="join-btn" onClick={forceChain}>
                    Switch Chain
                  </button>
                </div>
              ) : (
                <></>
              )}

              {(!isStaked || !isApproved) && (
                <>
                  {!isFinished && account && chainId == connectedChainId && (
                    <div className="action-item">
                      <button
                        className="join-btn"
                        onClick={
                          isApproved
                            ? () => showStakeModal(pool, true)
                            : approve
                        }
                      >
                        {isApproved
                          ? 'Stake'
                          : approving
                          ? 'Approving...'
                          : 'Approve'}
                      </button>
                    </div>
                  )}
                </>
              )}

              {isStaked && (
                <div className="reward-stake-block">
                  <h5>STAKED</h5>
                  <div className="reward-stake-item">
                    <div className="reward-item mb-0">
                      <img
                        src={pool?.stakeIcon.replace('/public/', '/')}
                        alt=""
                        style={{ maxHeight: 45 }}
                      />
                      <p>
                        {numeral(
                          ethers.utils.formatEther(pool.stakeToken.staked),
                        ).format('0,0.00')}{' '}
                        {pool.stakeSymbol
                          ? pool.stakeSymbol
                          : pool.stakeToken.symbol}
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
                      <button
                        onClick={
                          isFinished
                            ? withdrawAll
                            : () => showStakeModal(pool, false)
                        }
                        disabled={!account || chainId != connectedChainId}
                      >
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
                      </button>
                      <button
                        onClick={() => showStakeModal(pool, true)}
                        disabled={
                          !account || chainId != connectedChainId || isFinished
                        }
                      >
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
                      </button>
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
                      {pool.stakeSymbol
                        ? pool.stakeSymbol
                        : pool.stakeToken.symbol}
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
