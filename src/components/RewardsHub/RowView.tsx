import { useState } from 'react';
import { ethers } from 'ethers';

import numeral from 'numeral';

import { useBlockNumber } from '../../library/providers/BlockNumberProvider';
import { getExplorerCountdownLink } from '../../library/helpers/chains';
import Plus from '../../assets/svg/plus.svg';
import Minus from '../../assets/svg/minus.svg';

import { PoolResult } from '../../hooks/Pools';

import useEthers from '../../library/hooks/useEthers';

import {
  CHAIN_NAMES,
  ChainId,
  CHAIN_ETHER,
  EXPLORER_URLS,
  RPC_URLS,
} from '../../library/constants/chains';
import { useLayoutContext } from '../../layouts/MainLayout';
import { PoolType } from '../../configs';

export const RowView = ({
  chainId,
  pool,
  showStakeModal,
}: {
  showStakeModal: any;
  chainId: ChainId;
  pool: PoolResult;
}) => {
  const currentBlock = useBlockNumber(chainId) ?? 0;

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const { setIsWalletModalOpen } = useLayoutContext();

  const { account, chainId: connectedChainId } = useEthers();

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
  const connect = () => {
    setIsWalletModalOpen(true);
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

  const counter = () => {
    return (
      <>
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
        )}
      </>
    );
  };

  return (
    <>
      <div className="RewardsRowViewNew">
        <img src={pool?.stakeIcon.replace('/public/', '/')} alt="" />
        <div className="content">
          <span>{pool.name}</span>
          <p>
            EARN{' '}
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
            STAKE {pool.stakeSymbol ? pool.stakeSymbol : pool.stakeToken.symbol}
          </p>
          <span>
            Total Staked:{' '}
            {numeral(
              ethers.utils.formatEther(pool.stakeToken.totalStaked),
            ).format('0,0.00')}{' '}
            {pool.stakeSymbol ? pool.stakeSymbol : pool.stakeToken.symbol}
          </span>
          <span>
            {numeral(
              ethers.utils.formatEther(pool.stakeToken.totalStakedUSD),
            ).format('$0,0.00')}
          </span>
        </div>
        <div className="content">
          <span>APR: {numeral(pool.apr).format('0.00%')}</span>
          <p>
            {numeral((pool.depositBurnFee + pool.depositFee) / 10000.0).format(
              '0.00%',
            )}{' '}
            {pool.depositBurnFee > 0 && pool.depositFee > 0
              ? 'Burn/Deposit'
              : pool.depositBurnFee > 0
              ? 'Burn'
              : 'Deposit'}{' '}
            Fee
          </p>

          <p>
            {pool.usesBlocks ? (
              <a
                href={getExplorerCountdownLink(
                  chainId,
                  currentBlock < pool.start ? pool.start : pool.end,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                {counter()}
              </a>
            ) : (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  return false;
                }}
                style={{ cursor: 'text' }}
              >
                {counter()}
              </a>
            )}
          </p>
          {isStaked && (
            <>
              <span>
                My Stake:{' '}
                {numeral(
                  ethers.utils.formatEther(pool.stakeToken.staked),
                ).format('0,0.00')}{' '}
                {pool.stakeSymbol ? pool.stakeSymbol : pool.stakeToken.symbol}
              </span>
              <span>
                ~{' '}
                {numeral(
                  ethers.utils.formatEther(pool.stakeToken.stakedUSD),
                ).format('$0,0.00')}
              </span>
            </>
          )}
        </div>
        <button onClick={() => toggleExpand()}>
          {isExpanded ? 'Close' : 'Expand'}
        </button>
      </div>
      {isExpanded ? (
        <div className="RewardsRowViewExpand">
          <div className="earned">
            <div className="content">
              <img src={pool?.reward0Icon.replace('/public/', '/')} alt="" />
              <div className="inner">
                <span>{pool.rewardTokens[0].symbol} Earned</span>
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
            </div>
            {pool.type == PoolType.DoubleV1 ||
            pool.type == PoolType.DoubleV2 ? (
              <div className="content">
                <img src={pool?.reward1Icon.replace('/public/', '/')} alt="" />
                <div className="inner">
                  <span>{pool.rewardTokens[1].symbol} Earned</span>
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
                </div>
              </div>
            ) : null}
            {account && chainId == connectedChainId && hasHarvest ? (
              <div className="innerbtn">
                <button
                  className="join-btn"
                  onClick={harvest}
                  disabled={harvesting}
                >
                  {harvesting ? 'Harvesting...' : 'Harvest'}
                </button>
              </div>
            ) : null}
            {(!isStaked || !isApproved) && (
              <>
                {!isFinished && account && chainId == connectedChainId && (
                  <div className="innerbtn">
                    <button
                      className="join-btn"
                      onClick={
                        isApproved ? () => showStakeModal(pool, true) : approve
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
              <>
                <div className="content">
                  <div className="inner">
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
                </div>
                {!account ? (
                  <div className="innerbtn">
                    <button className="join-btn" onClick={connect}>
                      Connect
                    </button>
                  </div>
                ) : chainId != connectedChainId ? (
                  <div className="innerbtn">
                    <button className="join-btn" onClick={forceChain}>
                      Switch Chain
                    </button>
                  </div>
                ) : (
                  <div className="buttons">
                    <button
                      onClick={
                        isFinished
                          ? withdrawAll
                          : () => showStakeModal(pool, false)
                      }
                      disabled={!account || chainId != connectedChainId}
                    >
                      <img src={Plus} />
                    </button>
                    <button
                      onClick={() => showStakeModal(pool, true)}
                      disabled={
                        !account || chainId != connectedChainId || isFinished
                      }
                    >
                      <img src={Minus} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RowView;
