import { Interface } from '@ethersproject/abi';
import { Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';

import { PoolType } from '../configs';

export type PoolChainData = {
  interface: Interface;
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

export type PoolData = PoolChainData & {
  address: string;
  type: PoolType;
  name: string;
};

export type PoolResult = PoolData & {
  useApproveAction(pool: PoolData): (amount: BigNumber) => Promise<void>;
  useDepositAction(pool: PoolData): (amount: BigNumber) => Promise<void>;
  useHarvestAction(pool: PoolData): () => Promise<void>;
  useWithdrawAction(pool: PoolData): (amount: BigNumber) => Promise<void>;
};
