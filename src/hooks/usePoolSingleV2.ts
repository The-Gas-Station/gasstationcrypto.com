import { BigNumber } from '@ethersproject/bignumber';

import { PoolSingleV2Interface } from '../constants';
import { Falsy } from '../library/models/types';
import { useContractCalls } from '../library/hooks/useContractCall';
import useTokenAllowance from '../library/hooks/useTokenAllowance';
import useTokenBalance from '../library/hooks/useTokenBalance';
import useTokenSymbol from '../library/hooks/useTokenSymbol';
import useTokenPrice from './useTokenPrice';
import { ChainId, BLOCKS_PER_YEAR } from '../library/constants/chains';

export function usePool(
  chainId: ChainId | undefined,
  poolAddress: string | Falsy,
  address: string | Falsy,
): {
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
} {
  const [
    _rewardToken,
    _rewardsPerBlock,
    _stakeToken,
    _depositFee,
    _depositBurnFee,
    _startBlock,
    _endBlock,
    _userInfo,
    _pendingRewards,
  ] =
    useContractCalls(chainId, [
      poolAddress && {
        abi: PoolSingleV2Interface,
        address: poolAddress,
        method: 'REWARD_TOKEN',
        args: [],
      },
      poolAddress && {
        abi: PoolSingleV2Interface,
        address: poolAddress,
        method: 'rewardPerBlock',
        args: [],
      },
      poolAddress && {
        abi: PoolSingleV2Interface,
        address: poolAddress,
        method: 'STAKE_TOKEN',
        args: [],
      },
      poolAddress && {
        abi: PoolSingleV2Interface,
        address: poolAddress,
        method: 'depositFee',
        args: [],
      },
      poolAddress && {
        abi: PoolSingleV2Interface,
        address: poolAddress,
        method: 'depositBurnFee',
        args: [],
      },
      poolAddress && {
        abi: PoolSingleV2Interface,
        address: poolAddress,
        method: 'startBlock',
        args: [],
      },
      poolAddress && {
        abi: PoolSingleV2Interface,
        address: poolAddress,
        method: 'endBlock',
        args: [],
      },
      poolAddress &&
        address && {
          abi: PoolSingleV2Interface,
          address: poolAddress,
          method: 'userInfo',
          args: [address],
        },
      poolAddress &&
        address && {
          abi: PoolSingleV2Interface,
          address: poolAddress,
          method: 'pendingReward',
          args: [address],
        },
    ]) ?? [];

  const [
    rewardTokenAddresses,
    rewardsPerBlock,
    stakeTokenAddress,
    depositFee,
    depositBurnFee,
    startBlock,
    endBlock,
    stakedAmount,
    pendingRewards,
  ] = [
    [_rewardToken ? _rewardToken[0] : undefined],
    [_rewardsPerBlock ? _rewardsPerBlock[0] : undefined],
    _stakeToken ? _stakeToken[0] : undefined,
    _depositFee ? parseInt(_depositFee[0]) : 0,
    _depositBurnFee ? parseInt(_depositBurnFee[0]) : 0,
    _startBlock ? _startBlock[0] : undefined,
    _endBlock ? _endBlock[0] : undefined,
    _userInfo ? _userInfo[0] : undefined,
    [_pendingRewards ? _pendingRewards[0] : undefined],
  ];

  const rewardsPerYearUSD = rewardTokenAddresses.reduce(
    (prev, address: string, i) => {
      const rewardsPerYear = BigNumber.from(
        rewardsPerBlock[i] ? rewardsPerBlock[i] : BigNumber.from(0),
      ).mul(chainId ? BLOCKS_PER_YEAR[chainId] : 0);

      return prev.add(useTokenPrice(chainId, address, rewardsPerYear));
    },
    BigNumber.from(0),
  );

  const totalStaked =
    useTokenBalance(chainId, stakeTokenAddress, poolAddress) ??
    BigNumber.from(0);
  const totalStakedUSD = useTokenPrice(
    chainId,
    stakeTokenAddress,
    totalStaked,
  ).add(BigNumber.from(10).pow(18));

  const balance =
    useTokenBalance(chainId, stakeTokenAddress, address) ?? BigNumber.from(0);
  const approved =
    useTokenAllowance(chainId, stakeTokenAddress, address, poolAddress) ??
    BigNumber.from(0);

  return {
    rewardTokens: rewardTokenAddresses.map((address: string, i) => ({
      address,
      symbol: useTokenSymbol(chainId, address) ?? '',
      rewardsPerBlock: rewardsPerBlock[i]
        ? rewardsPerBlock[i]
        : BigNumber.from(0),
      pendingRewards: pendingRewards[i] ? pendingRewards[i] : BigNumber.from(0),
      pendingRewardsUSD: useTokenPrice(
        chainId,
        address,
        pendingRewards[i] ? pendingRewards[i] : BigNumber.from(0),
      ),
    })),
    stakeToken: {
      address: stakeTokenAddress,
      symbol: useTokenSymbol(chainId, stakeTokenAddress) ?? '',
      staked: stakedAmount ?? BigNumber.from(0),
      stakedUSD: useTokenPrice(chainId, stakeTokenAddress, stakedAmount),
      balance,
      balanceUSD: useTokenPrice(chainId, stakeTokenAddress, balance),
      approved,
      totalStaked,
      totalStakedUSD,
    },
    apr:
      rewardsPerYearUSD && totalStakedUSD
        ? rewardsPerYearUSD.mul(10000).div(totalStakedUSD).toNumber() / 10000
        : 0,
    depositFee,
    depositBurnFee,
    withdrawFee: 0,
    startBlock: startBlock ? startBlock.toNumber() : 0,
    endBlock: endBlock ? endBlock.toNumber() : 0,
  };
}

export default usePool;
