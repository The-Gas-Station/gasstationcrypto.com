import { BigNumber } from '@ethersproject/bignumber';

import { PoolDualV1Interface } from '../constants';
import { Falsy } from '../library/models/types';
import { useContractCalls } from '../library/hooks/useContractCall';
import useTokenAllowance from '../library/hooks/useTokenAllowance';
import useTokenBalance from '../library/hooks/useTokenBalance';
import useTokenSymbol from '../library/hooks/useTokenSymbol';
import useTokenDecimals from '../library/hooks/useTokenDecimals';
import useTokenPrice from './useTokenPrice';
import { ChainId, BLOCKS_PER_YEAR } from '../library/constants/chains';

import { PoolChainData } from './Pools';

export function usePoolDualV1(
  chainId: ChainId | undefined,
  poolAddress: string | Falsy,
  address: string | Falsy,
): PoolChainData {
  const [
    _rewardToken0,
    _rewardToken1,
    _rewards0PerBlock,
    _rewards1PerBlock,
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
        abi: PoolDualV1Interface,
        address: poolAddress,
        method: 'REWARD_TOKEN0',
        args: [],
      },
      poolAddress && {
        abi: PoolDualV1Interface,
        address: poolAddress,
        method: 'REWARD_TOKEN1',
        args: [],
      },
      poolAddress && {
        abi: PoolDualV1Interface,
        address: poolAddress,
        method: 'reward0PerBlock',
        args: [],
      },
      poolAddress && {
        abi: PoolDualV1Interface,
        address: poolAddress,
        method: 'reward1PerBlock',
        args: [],
      },
      poolAddress && {
        abi: PoolDualV1Interface,
        address: poolAddress,
        method: 'STAKE_TOKEN',
        args: [],
      },
      poolAddress && {
        abi: PoolDualV1Interface,
        address: poolAddress,
        method: 'depositFee',
        args: [],
      },
      poolAddress && {
        abi: PoolDualV1Interface,
        address: poolAddress,
        method: 'depositBurnFee',
        args: [],
      },
      poolAddress && {
        abi: PoolDualV1Interface,
        address: poolAddress,
        method: 'startBlock',
        args: [],
      },
      poolAddress && {
        abi: PoolDualV1Interface,
        address: poolAddress,
        method: 'endBlock',
        args: [],
      },
      poolAddress &&
        address && {
          abi: PoolDualV1Interface,
          address: poolAddress,
          method: 'userInfo',
          args: [address],
        },
      poolAddress &&
        address && {
          abi: PoolDualV1Interface,
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
    [
      _rewardToken0 ? _rewardToken0[0] : undefined,
      _rewardToken1 ? _rewardToken1[0] : undefined,
    ],
    [
      _rewards0PerBlock ? _rewards0PerBlock[0] : undefined,
      _rewards1PerBlock ? _rewards1PerBlock[0] : undefined,
    ],
    _stakeToken ? _stakeToken[0] : undefined,
    _depositFee ? parseInt(_depositFee[0]) : 0,
    _depositBurnFee ? parseInt(_depositBurnFee[0]) : 0,
    _startBlock ? _startBlock[0] : undefined,
    _endBlock ? _endBlock[0] : undefined,
    _userInfo ? _userInfo[0] : undefined,
    [
      _pendingRewards && _pendingRewards[0] ? _pendingRewards[0] : undefined,
      _pendingRewards && _pendingRewards[1] ? _pendingRewards[1] : undefined,
    ],
  ];

  const rewardDecimals: number[] = [18, 18];

  const rewardsPerYearUSD = rewardTokenAddresses.reduce(
    (prev, address: string, i) => {
      const decimals = useTokenDecimals(chainId, address);

      rewardDecimals[i] = decimals ?? 18;

      if (rewardsPerBlock[i] && decimals) {
        rewardsPerBlock[i] = rewardsPerBlock[i].mul(
          BigNumber.from(10).pow(18 - decimals),
        );
      }

      if (pendingRewards[i] && decimals) {
        pendingRewards[i] = pendingRewards[i].mul(
          BigNumber.from(10).pow(18 - decimals),
        );
      }

      const rewardsPerYear = BigNumber.from(
        rewardsPerBlock[i] ? rewardsPerBlock[i] : BigNumber.from(0),
      ).mul(chainId ? BLOCKS_PER_YEAR[chainId] : 0);

      return prev.add(useTokenPrice(chainId, address, rewardsPerYear));
    },
    BigNumber.from(0),
  );

  const stakedDecimals = useTokenDecimals(chainId, stakeTokenAddress) ?? 18;

  let totalStaked =
    useTokenBalance(chainId, stakeTokenAddress, poolAddress) ??
    BigNumber.from(0);

  if (totalStaked && stakedDecimals) {
    totalStaked = totalStaked.mul(BigNumber.from(10).pow(18 - stakedDecimals));
  }

  let totalStakedUSD = useTokenPrice(chainId, stakeTokenAddress, totalStaked);

  if (totalStakedUSD && totalStakedUSD.eq(0)) {
    totalStakedUSD = BigNumber.from(10).pow(18);
  }

  const balance =
    useTokenBalance(chainId, stakeTokenAddress, address) ?? BigNumber.from(0);
  const approved =
    useTokenAllowance(chainId, stakeTokenAddress, address, poolAddress) ??
    BigNumber.from(0);

  const staked =
    stakedAmount && stakedDecimals
      ? stakedAmount.mul(BigNumber.from(10).pow(18 - stakedDecimals))
      : BigNumber.from(0);

  return {
    interface: PoolDualV1Interface,
    rewardTokens: rewardTokenAddresses.map((address: string, i) => ({
      address,
      symbol: useTokenSymbol(chainId, address) ?? '',
      decimals: rewardDecimals[i],
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
    startBlock: startBlock ? startBlock.toNumber() : 0,
    endBlock: endBlock ? endBlock.toNumber() : 0,
  };
}

export default usePoolDualV1;
