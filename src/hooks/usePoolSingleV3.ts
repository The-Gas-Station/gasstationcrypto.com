import { BigNumber } from '@ethersproject/bignumber';

import { PoolSingleV2Interface } from '../constants';
import { Falsy } from '../library/models/types';
import { useContractCalls } from '../library/hooks/useContractCall';
import useTokenAllowance from '../library/hooks/useTokenAllowance';
import useTokenBalance from '../library/hooks/useTokenBalance';
import useTokenSymbol from '../library/hooks/useTokenSymbol';
import useTokenDecimals from '../library/hooks/useTokenDecimals';
import useTokenPrice from './useTokenPrice';
import { ChainId } from '../library/constants/chains';

import { PoolChainData } from './Pools';

export function usePoolSingleV3(
  chainId: ChainId,
  poolAddress: string | Falsy,
  address: string | Falsy,
): PoolChainData {
  const [
    _rewardToken,
    _rewardsPerDay,
    _stakeToken,
    _depositFee,
    _depositBurnFee,
    _startTimestamp,
    _endTimestamp,
    _totalStakedAmount,
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
        method: 'rewardPerDay',
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
        method: 'startTimestamp',
        args: [],
      },
      poolAddress && {
        abi: PoolSingleV2Interface,
        address: poolAddress,
        method: 'endTimestamp',
        args: [],
      },
      poolAddress && {
        abi: PoolSingleV2Interface,
        address: poolAddress,
        method: 'totalStaked',
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
    rewardsPerDay,
    stakeTokenAddress,
    depositFee,
    depositBurnFee,
    startTimestamp,
    endTimestamp,
    totalStakedAmount,
    stakedAmount,
    pendingRewards,
  ] = [
    [_rewardToken ? _rewardToken[0] : undefined],
    [(_rewardsPerDay ? _rewardsPerDay[0] : undefined) ?? BigNumber.from(0)],
    _stakeToken ? _stakeToken[0] : undefined,
    _depositFee ? parseInt(_depositFee[0]) : 0,
    _depositBurnFee ? parseInt(_depositBurnFee[0]) : 0,
    _startTimestamp ? _startTimestamp[0] : undefined,
    _endTimestamp ? _endTimestamp[0] : undefined,
    _totalStakedAmount ? _totalStakedAmount[0] : undefined,
    _userInfo ? _userInfo[0] : undefined,
    [_pendingRewards ? _pendingRewards[0] : undefined],
  ];

  const rewardDecimals: number[] = [18];

  const rewardsPerYearUSD = rewardTokenAddresses.reduce(
    (prev, address: string, i) => {
      const decimals = useTokenDecimals(chainId, address);

      rewardDecimals[i] = decimals ?? 18;

      if (rewardsPerDay[i] && decimals) {
        rewardsPerDay[i] = rewardsPerDay[i].mul(
          BigNumber.from(10).pow(18 - decimals),
        );
      }

      if (pendingRewards[i] && decimals) {
        pendingRewards[i] = pendingRewards[i].mul(
          BigNumber.from(10).pow(18 - decimals),
        );
      }

      const rewardsPerYear = rewardsPerDay[i].mul(365);

      return prev.add(useTokenPrice(chainId, address, rewardsPerYear));
    },
    BigNumber.from(0),
  );

  const stakedDecimals = useTokenDecimals(chainId, stakeTokenAddress) ?? 18;

  let totalStaked = totalStakedAmount ?? BigNumber.from(0);

  if (totalStaked && stakedDecimals) {
    totalStaked = totalStaked.mul(BigNumber.from(10).pow(18 - stakedDecimals));
  }

  let totalStakedUSD = useTokenPrice(chainId, stakeTokenAddress, totalStaked);

  if (totalStakedUSD && totalStakedUSD.eq(0)) {
    totalStakedUSD = BigNumber.from(10).pow(18);
  }

  let balance =
    useTokenBalance(chainId, stakeTokenAddress, address) ?? BigNumber.from(0);

  if (balance && stakedDecimals) {
    balance = balance.mul(BigNumber.from(10).pow(18 - stakedDecimals));
  }

  let approved =
    useTokenAllowance(chainId, stakeTokenAddress, address, poolAddress) ??
    BigNumber.from(0);

  if (approved && stakedDecimals) {
    approved = approved.mul(BigNumber.from(10).pow(18 - stakedDecimals));
  }

  const staked =
    stakedAmount && stakedDecimals
      ? stakedAmount.mul(BigNumber.from(10).pow(18 - stakedDecimals))
      : BigNumber.from(0);

  return {
    interface: PoolSingleV2Interface,
    rewardTokens: rewardTokenAddresses.map((address: string, i) => ({
      address,
      symbol: useTokenSymbol(chainId, address) ?? '',
      decimals: rewardDecimals[i],
      rewardsPerDay: rewardsPerDay[i],
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
      decimals: stakedDecimals,
      staked: staked,
      stakedUSD: useTokenPrice(chainId, stakeTokenAddress, staked),
      balance,
      balanceUSD: useTokenPrice(chainId, stakeTokenAddress, balance),
      approved,
      totalStaked,
      totalStakedUSD,
    },
    apr:
      rewardsPerYearUSD && totalStakedUSD && totalStakedUSD.gt(0)
        ? rewardsPerYearUSD.mul(10000).div(totalStakedUSD).toNumber() / 10000
        : 0,
    depositFee,
    depositBurnFee,
    withdrawFee: 0,
    usesBlocks: false,
    start: startTimestamp ? startTimestamp.toNumber() : 0,
    end: endTimestamp ? endTimestamp.toNumber() : 0,
  };
}

export default usePoolSingleV3;
