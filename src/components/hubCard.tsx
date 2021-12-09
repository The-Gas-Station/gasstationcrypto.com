import React, { useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { ethers } from 'ethers';

import { MDBCollapse } from 'mdb-react-ui-kit';

import { PoolType } from '../configs';
import numeral from 'numeral';

import { useBlockNumber } from '../library/providers/BlockNumberProvider';

import GasIcon from '../assets/gas.svg';
import QuestionIcon from '../assets/icons-question.svg';
import StopwatchIcon from '../assets/icon-stopwatch.svg';
import Metamask from '../assets/wallets/metamask.png';

export const HubCard = ({
  chainId,
  pool,
}: {
  chainId: number;
  pool: {
    name: string;
    type: PoolType;
    rewardTokens: {
      address: string;
      symbol: string;
      rewardsPerBlock: BigNumber;
      pendingRewards: BigNumber;
      pendingRewardsUSD: BigNumber;
    }[];
    stakeToken: {
      address: string;
      symbol: string;
      staked: BigNumber;
      stakedUSD: BigNumber;
      balance: BigNumber;
      balanceUSD: BigNumber;
      approved: BigNumber;
      totalStaked: BigNumber;
      totalStakedUSD: BigNumber;
    };
    apr: number;
    depositFee: number;
    depositBurnFee: number;
    withdrawFee: number;
    startBlock: number;
    endBlock: number;
  };
}) => {
  const currentBlock = useBlockNumber(chainId) ?? 0;

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
              Earned <img src={QuestionIcon} alt="" className="ms-1" />
            </span>
            <p className="text-green">
              {numeral(
                ethers.utils.formatEther(pool.rewardTokens[0].pendingRewards),
              ).format('0,0.00')}
            </p>
            <span>
              {numeral(
                ethers.utils.formatEther(
                  pool.rewardTokens[0].pendingRewardsUSD,
                ),
              ).format('$0,0.00')}{' '}
              {pool.rewardTokens[0].symbol}
            </span>
          </div>
        </td>
        <td>
          <div className="apy-content">
            <span>APY</span>
            <p>{numeral(pool.apr).format('0.00%')}</p>
          </div>
        </td>
        <td className="d-none d-sm-block">
          <div className="apy-content">
            <span>Total Staked</span>
            <p>
              {numeral(ethers.utils.formatEther(pool.stakeToken.staked)).format(
                '0,0.00',
              )}{' '}
              {pool.stakeToken.symbol}
            </p>
          </div>
        </td>
        <td className="d-none d-sm-block">
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
        <td className="d-none d-sm-block">
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
      <MDBCollapse show={showShow}>
        <div className="action-dropdown">
          <p className="d-block d-sm-none mb-2" style={{ color: `#8A92A6` }}>
            Stake BNB-bscGAS ApeLP Earn USDC +bscGAS
          </p>
          <p className="action-title">
            Add Token to BCS Mainnet wallet
            <img
              src={Metamask}
              alt=""
              className="ms-2"
              style={{ maxWidth: `16px` }}
            />
          </p>
          <div className="row">
            <div className="col-md-4">
              <div className="action-item recent-item">
                <div className="action-content">
                  <span className="text-pink">RECENT BNB EARNED</span>
                  <p>0.000 BNB</p>
                  <span>~$0.00 USD</span>
                </div>
                <div className="action-content">
                  <span>
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
                  </span>
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
              <p>100,000 bscGAS</p>
            </div>
            <div className="apy-content">
              <span>
                Ends in <img src={StopwatchIcon} alt="" className="ms-1" />
              </span>
              <p>2,645,689 blocks</p>
            </div>
            <div className="apy-content">
              <span>Burn/Deposit Fee</span>
              <p>1%</p>
            </div>
          </div>
        </div>
      </MDBCollapse>
    </>
  );
};

export default HubCard;
