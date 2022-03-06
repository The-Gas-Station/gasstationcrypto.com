import { useState } from 'react';
import { ethers } from 'ethers';
import RowViewExpanded from './RowViewExpand';
import { MDBTooltip } from 'mdb-react-ui-kit';

import numeral from 'numeral';

import { useBlockNumber } from '../library/providers/BlockNumberProvider';
import { getExplorerCountdownLink } from '../library/helpers/chains';

import QuestionIcon from '../assets/icons-question.svg';
import StopwatchIcon from '../assets/icon-stopwatch.svg';

import { PoolResult } from '../hooks/Pools';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export const RowView = ({
  chainId,
  pool,
  showStakeModal,
}: {
  showStakeModal: any;
  chainId: number;
  pool: PoolResult;
}) => {
  const currentBlock = useBlockNumber(chainId) ?? 0;

  const [showShow, setShowShow] = useState(false);

  const toggleShow = () => {
    setShowShow(!showShow);
  };

  return (
    <>
      <div className="rowviewStaking">
        <div className="img">
          <img src={pool?.stakeIcon.replace('/public/', '/')} alt="" />
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

          <p>
            <span className="text-white1">STAKE</span>{' '}
            {pool.stakeSymbol ? pool.stakeSymbol : pool.stakeToken.symbol}
          </p>
        </div>

        <div className="earned">
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
              ethers.utils.formatEther(pool.rewardTokens[0].pendingRewardsUSD),
            ).format('$0,0.00')}
          </span>
        </div>

        <div className="apr">
          <span>APR</span>
          <p>{numeral(pool.apr).format('0.00%')}</p>
        </div>

        <div className="staked">
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

        <div className="timer">
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

        <div className="fees">
          <span>
            {pool.depositBurnFee > 0 && pool.depositFee > 0
              ? 'Burn/Deposit'
              : pool.depositBurnFee > 0
              ? 'Burn'
              : 'Deposit'}{' '}
            Fee
          </span>
          <p>
            {numeral((pool.depositBurnFee + pool.depositFee) / 10000.0).format(
              '0.00%',
            )}
          </p>
        </div>

        <div className="expand">
          {showShow ? (
            <div onClick={() => toggleShow()}>
              Close <IoIosArrowUp />
            </div>
          ) : (
            <div onClick={() => toggleShow()}>
              Expand <IoIosArrowDown />
            </div>
          )}
        </div>
      </div>

      {showShow ? (
        <RowViewExpanded
          chainId={chainId}
          pool={pool}
          showStakeModal={showStakeModal}
        />
      ) : null}
    </>
  );
};

export default RowView;
