import { useEffect, useState } from 'react';

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
): {
  token0: string | undefined;
  token1: string | undefined;
  ratio: BigNumber | undefined;
  percent0: BigNumber | undefined;
  percent1: BigNumber | undefined;
  totalSupply: BigNumber | undefined;
} {
  const [state, setState] = useState<{
    token0: string | undefined;
    token1: string | undefined;
    ratio: BigNumber | undefined;
    percent0: BigNumber | undefined;
    percent1: BigNumber | undefined;
  }>({
    token0: undefined,
    token1: undefined,
    ratio: undefined,
    percent0: undefined,
    percent1: undefined,
  });

  const [_token0, _token1, _reserves, _totalSupply] =
    useContractCalls(chainId, [
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
    ]) ?? [];

  const [token0, token1, reserve0, reserve1, totalSupply] = [
    _token0 ? _token0[0] : undefined,
    _token1 ? _token1[0] : undefined,
    _reserves ? _reserves[0] : undefined,
    _reserves ? _reserves[1] : undefined,
    _totalSupply ? _totalSupply[0] : undefined,
  ];

  useEffect(() => {
    const newState: {
      token0: string | undefined;
      token1: string | undefined;
      ratio: BigNumber | undefined;
      percent0: BigNumber | undefined;
      percent1: BigNumber | undefined;
    } = {
      token0: undefined,
      token1: undefined,
      ratio: undefined,
      percent0: undefined,
      percent1: undefined,
    };

    if (!tokenAddress || !token0) {
      setState(newState);
      return;
    }

    if (tokenAddress.toLowerCase() == token0.toLowerCase()) {
      newState.token0 = token0;
      newState.token1 = token1;

      if (reserve0 && reserve1) {
        newState.ratio = BUFFER.mul(reserve1).div(reserve0);
      }
      if (reserve0 && totalSupply) {
        newState.percent0 = BUFFER.mul(reserve0).div(totalSupply);
      }
      if (reserve1 && totalSupply) {
        newState.percent1 = BUFFER.mul(reserve1).div(totalSupply);
      }
    } else {
      newState.token0 = token1;
      newState.token1 = token0;

      if (reserve0 && reserve1) {
        newState.ratio = BUFFER.mul(reserve0).div(reserve1);
      }
      if (reserve0 && totalSupply) {
        newState.percent1 = BUFFER.mul(reserve0).div(totalSupply);
      }
      if (reserve1 && totalSupply) {
        newState.percent0 = BUFFER.mul(reserve1).div(totalSupply);
      }
    }

    setState(newState);
  }, [tokenAddress, token0, reserve0, reserve1, totalSupply]);

  return { ...state, totalSupply };
}

export default useLiquidityPairRatio;
