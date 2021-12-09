import { BigNumber } from '@ethersproject/bignumber';

import { PoolDualV1Interface } from '../constants';
import { Falsy } from '../library/models/types';
import { useContractCalls } from '../library/hooks/useContractCall';
import useTokenAllowance from '../library/hooks/useTokenAllowance';
import useTokenBalance from '../library/hooks/useTokenBalance';
import useTokenSymbol from '../library/hooks/useTokenSymbol';
import useTokenPrice from './useTokenPrice';
import { ChainId, BLOCKS_PER_YEAR } from '../library/constants/chains';

export function usePoolDualV1(
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
  startBlock: BigNumber;
  endBlock: BigNumber;
} {
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
    _depositFee ? _depositFee[0] : undefined,
    _depositBurnFee ? _depositBurnFee[0] : undefined,
    _startBlock ? _startBlock[0] : undefined,
    _endBlock ? _endBlock[0] : undefined,
    _userInfo ? _userInfo[0] : undefined,
    [
      _pendingRewards && _pendingRewards[0] ? _pendingRewards[0] : undefined,
      _pendingRewards && _pendingRewards[1] ? _pendingRewards[1] : undefined,
    ],
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
      staked: stakedAmount,
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
    startBlock,
    endBlock,
  };
}

export default usePoolDualV1;
