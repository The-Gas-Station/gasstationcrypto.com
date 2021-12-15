import { Interface } from '@ethersproject/abi';
import { BigNumber } from '@ethersproject/bignumber';

import { ChainInfoPool } from '../configs/declarations';

export type PoolChainData = {
  interface: Interface;
  rewardTokens: {
    address: string;
    symbol: string;
    decimals: number;
    pendingRewards: BigNumber;
    pendingRewardsUSD: BigNumber;
    rewardsPerDay: BigNumber;
  }[];
  stakeToken: {
    address: string;
    symbol: string;
    decimals: number;
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
  usesBlocks: boolean;
  start: number;
  end: number;
};

export type PoolData = PoolChainData & ChainInfoPool;

export type PoolResult = PoolData & {
  useApproveAction(pool: PoolData): (amount: BigNumber) => Promise<void>;
  useDepositAction(pool: PoolData): (amount: BigNumber) => Promise<void>;
  useHarvestAction(pool: PoolData): () => Promise<void>;
  useWithdrawAction(pool: PoolData): (amount: BigNumber) => Promise<void>;
};
