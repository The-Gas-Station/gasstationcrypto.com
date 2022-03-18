import { useState } from 'react';
import { ethers } from 'ethers';
import { MDBCollapse } from 'mdb-react-ui-kit';

import numeral from 'numeral';

import { useBlockNumber } from '../../library/providers/BlockNumberProvider';
import useEthers from '../../library/hooks/useEthers';
import { getExplorerCountdownLink } from '../../library/helpers/chains';

import StopwatchIcon from '../../assets/icon-stopwatch.svg';

import { PoolResult } from '../../hooks/Pools';
import {
  CHAIN_NAMES,
  ChainId,
  CHAIN_ETHER,
  EXPLORER_URLS,
  RPC_URLS,
} from '../../library/constants/chains';
import { PoolType } from '../../configs';

type toggleProps = {
  showStakeModal: any;
  chainId: ChainId;
  pool: PoolResult;
};

import { useLayoutContext } from '../../layouts/MainLayout';
import { FlexRowC } from '../../styles';

export const GridHubCard = ({ showStakeModal, chainId, pool }: toggleProps) => {
  const { setIsWalletModalOpen } = useLayoutContext();
  const { account, chainId: connectedChainId } = useEthers();

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

  const [showStakingExpand, setShowStakingExpand] = useState(false);

  const toggleStakingExpand = () => {
    setShowStakingExpand(!showStakingExpand);
  };

  return (
    <>
      <div className="RewardsCardView">
        <div className="cardHead">
          <div>
            <title>{pool.name}</title>

            <p>
              <span>earn</span>
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
              <span>stake</span>
              {pool.stakeSymbol ? pool.stakeSymbol : pool.stakeToken.symbol}
            </p>
          </div>
          <img src={pool?.stakeIcon.replace('/public/', '/')} />
        </div>
        <div className="cardBody">
          <title>
            <p>{pool.apr ? 'APR' : 'Total Rewards/Day'}</p>
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
          </title>
          <div className="rewardsBlock">
            <title>
              <span>Earned Rewards</span>
            </title>
            <FlexRowC>
              <div className="reward">
                <p>
                  {pool.rewardSymbols && pool.rewardSymbols[0]
                    ? pool.rewardSymbols[0]
                    : pool.rewardTokens[0].symbol}
                </p>
                <img src={pool?.reward0Icon.replace('/public/', '/')} alt="" />
                <p>
                  {numeral(
                    ethers.utils.formatEther(
                      pool.rewardTokens[0].pendingRewards,
                    ),
                  ).format('0,0.00')}{' '}
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

              {pool.type == PoolType.DoubleV1 ||
              pool.type == PoolType.DoubleV2 ? (
                <div className="reward">
                  <p>
                    {pool.rewardSymbols && pool.rewardSymbols[1]
                      ? pool.rewardSymbols[1]
                      : pool.rewardTokens[1].symbol}
                  </p>
                  <img
                    src={pool?.reward1Icon.replace('/public/', '/')}
                    alt=""
                  />
                  <p>
                    {numeral(
                      ethers.utils.formatEther(
                        pool.rewardTokens[1].pendingRewards,
                      ),
                    ).format('0,0.00')}
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
              ) : (
                <></>
              )}
            </FlexRowC>
            {account && chainId == connectedChainId && hasHarvest ? (
              <button onClick={harvest} disabled={harvesting}>
                {harvesting ? 'Harvesting...' : 'Harvest'}
              </button>
            ) : (
              <button>Harvest</button>
            )}
          </div>

          <FlexRowC>
            {!account ? (
              <button onClick={connect}>Connect</button>
            ) : chainId != connectedChainId ? (
              <button onClick={forceChain}>Switch Chain</button>
            ) : (
              <></>
            )}
            {(!isStaked || !isApproved) && (
              <>
                {!isFinished && account && chainId == connectedChainId && (
                  <button
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
                )}
              </>
            )}
          </FlexRowC>
          <div>
            <span onClick={toggleStakingExpand}>
              {showStakingExpand ? 'Hide' : 'Details'}
            </span>
          </div>

          {isStaked && (
            <div className="reward-stake-block">
              <h5>STAKED</h5>
              <div className="reward-stake-item">
                <div className="reward-items">
                  <div className="stake-item mb-0">
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
                    ></button>
                    <button
                      onClick={() => showStakeModal(pool, true)}
                      disabled={
                        !account || chainId != connectedChainId || isFinished
                      }
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showStakingExpand ? (
            <>
              <title>
                <p>Total Staked</p>
                <span>
                  {numeral(
                    ethers.utils.formatEther(pool.stakeToken.totalStaked),
                  ).format('0,0.00')}{' '}
                  {pool.stakeSymbol ? pool.stakeSymbol : pool.stakeToken.symbol}
                </span>
              </title>

              <title>
                <p>
                  {pool.depositBurnFee > 0 && pool.depositFee > 0
                    ? 'Burn/Deposit'
                    : pool.depositBurnFee > 0
                    ? 'Burn'
                    : 'Deposit'}{' '}
                  Fee
                </p>
                <span>
                  {numeral(
                    (pool.depositBurnFee + pool.depositFee) / 10000.0,
                  ).format('0.00%')}
                </span>
              </title>
              <title>
                <p>
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
                </p>
                <span>
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
                </span>
              </title>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default GridHubCard;
