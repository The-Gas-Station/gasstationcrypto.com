import { BigNumber } from '@ethersproject/bignumber';

import { LiquidityPairInterface } from '../constants/abi';
import { Falsy } from '../models/types';
import { useContractCalls } from './useContractCall';
import { ChainId } from '../constants/chains';

import BUFFER from '../constants/percisionBuffer';

export function useLiquidityPairRatio(
  chainId: ChainId | undefined,
  liquidityPairAddress: string | Falsy,
  tokenAddress: string | Falsy,
  throwWarning = true,
): {
  token0: string | undefined;
  token1: string | undefined;
  ratio: BigNumber | undefined;
  percent0: BigNumber | undefined;
  percent1: BigNumber | undefined;
  totalSupply: BigNumber | undefined;
} {
  const [_token0, _token1, _reserves, _totalSupply] =
    useContractCalls(
      chainId,
      [
        liquidityPairAddress && {
          abi: LiquidityPairInterface,
          address: liquidityPairAddress,
          method: 'token0',
          args: [],
        },
        liquidityPairAddress && {
          abi: LiquidityPairInterface,
          address: liquidityPairAddress,
          method: 'token1',
          args: [],
        },
        liquidityPairAddress && {
          abi: LiquidityPairInterface,
          address: liquidityPairAddress,
          method: 'getReserves',
          args: [],
        },
        liquidityPairAddress && {
          abi: LiquidityPairInterface,
          address: liquidityPairAddress,
          method: 'totalSupply',
          args: [],
        },
      ],
      throwWarning,
    ) ?? [];

  const [token0, token1, reserve0, reserve1, totalSupply] = [
    _token0 ? _token0[0] : undefined,
    _token1 ? _token1[0] : undefined,
    _reserves ? _reserves[0] : undefined,
    _reserves ? _reserves[1] : undefined,
    _totalSupply ? _totalSupply[0] : undefined,
  ];

  const state: {
    token0: string | undefined;
    token1: string | undefined;
    ratio: BigNumber | undefined;
    percent0: BigNumber | undefined;
    percent1: BigNumber | undefined;
    totalSupply: BigNumber | undefined;
  } = {
    token0: undefined,
    token1: undefined,
    ratio: undefined,
    percent0: undefined,
    percent1: undefined,
    totalSupply,
  };

  if (!tokenAddress || !token0) {
    return state;
  }

  if (tokenAddress.toLowerCase() == token0.toLowerCase()) {
    state.token0 = token0;
    state.token1 = token1;

    if (reserve0 && reserve1) {
      state.ratio = BUFFER.mul(reserve1).div(reserve0.eq(0) ? 1 : reserve0);
    }
    if (reserve0 && totalSupply) {
      state.percent0 = BUFFER.mul(reserve0).div(
        totalSupply.eq(0) ? 1 : totalSupply,
      );
    }
    if (reserve1 && totalSupply) {
      state.percent1 = BUFFER.mul(reserve1).div(
        totalSupply.eq(0) ? 1 : totalSupply,
      );
    }
  } else {
    state.token0 = token1;
    state.token1 = token0;

    if (reserve0 && reserve1) {
      state.ratio = BUFFER.mul(reserve0).div(reserve1.eq(0) ? 1 : reserve1);
    }
    if (reserve0 && totalSupply) {
      state.percent1 = BUFFER.mul(reserve0).div(
        totalSupply.eq(0) ? 1 : totalSupply,
      );
    }
    if (reserve1 && totalSupply) {
      state.percent0 = BUFFER.mul(reserve1).div(
        totalSupply.eq(0) ? 1 : totalSupply,
      );
    }
  }

  return state;
}

export default useLiquidityPairRatio;
