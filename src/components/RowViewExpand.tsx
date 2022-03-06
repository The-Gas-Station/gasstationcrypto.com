import { useState } from 'react';
import { ethers } from 'ethers';

import numeral from 'numeral';
import useEthers from '../library/hooks/useEthers';

import { useBlockNumber } from '../library/providers/BlockNumberProvider';

import { PoolResult } from '../hooks/Pools';
import {
  CHAIN_NAMES,
  ChainId,
  CHAIN_ETHER,
  EXPLORER_URLS,
  RPC_URLS,
} from '../library/constants/chains';
import { useLayoutContext } from '../layouts/MainLayout';
import { PoolType } from '../configs';

export const RowViewExpand = ({
  chainId,
  pool,
  showStakeModal,
}: {
  showStakeModal: any;
  chainId: ChainId;
  pool: PoolResult;
}) => {
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
  return (
    <div className="rowViewExpand">
      <div className="earned">
        <div className="content">
          <img src={pool?.reward0Icon.replace('/public/', '/')} alt="" />
          <div className="inner">
            <span>{pool.rewardTokens[0].symbol} Earned</span>
            <p>
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
        </div>
        {pool.type == PoolType.DoubleV1 || pool.type == PoolType.DoubleV2 ? (
          <div className="content">
            <img src={pool?.reward1Icon.replace('/public/', '/')} alt="" />
            <div className="inner">
              <span>{pool.rewardTokens[1].symbol} Earned</span>
              <p>
                {' '}
                {numeral(
                  ethers.utils.formatEther(pool.rewardTokens[1].pendingRewards),
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
            <h5>STAKED</h5>

            <div className="content">
              <div className="inner">
                <p>
                  {numeral(
                    ethers.utils.formatEther(pool.stakeToken.staked),
                  ).format('0,0.00')}{' '}
                  {pool.stakeSymbol ? pool.stakeSymbol : pool.stakeToken.symbol}
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
              <div className="reward-plus-minus">
                <button
                  onClick={
                    isFinished ? withdrawAll : () => showStakeModal(pool, false)
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
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default RowViewExpand;
