import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import useDebounce from '../library/hooks/useDebounce';
import useEthers from '../library/hooks/useEthers';
import useCoingeckoPrice from '../library/hooks/useCoingeckoPrice';
import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';
import { ChainId, CHAIN_NAMES } from '../library/constants/chains';
import { PoolType } from '../configs/declarations';

interface GASChainState {
  etherPrice: ethers.BigNumber;
  liquidityPairData: {};

  circulatingSupply: ethers.BigNumber;
  marketCap: ethers.BigNumber;
  totalRewards: ethers.BigNumber;
  holderCount: ethers.BigNumber;

  balance: ethers.BigNumber;
  rewards: ethers.BigNumber;

  totalStacked: ethers.BigNumber;
  pools: {
    type: PoolType;
    startBlock: number;
    endBlock: number;
    depositFee: number;
    depositBurnFee: number;
    totalStaked: ethers.BigNumber;

    stakeToken: {
      address: string;
      staked: ethers.BigNumber;
      allowance: ethers.BigNumber;
      decimals: number;
    };
    rewardToken?: {
      address: string;
      rewards: ethers.BigNumber;
      rewardsPerBlock: ethers.BigNumber;
      decimals: number;
    };
    rewardTokens?: {
      address: string;
      rewards: ethers.BigNumber;
      rewardsPerBlock: ethers.BigNumber;
      decimals: number;
    }[];
  }[];
}

interface GASState {
  [chainId: number]: GASChainState;
}

interface GASDataProviderProps {
  children: ReactNode;
}
interface SetStateCall {
  type: 'SET_STATE';
  chainId: ChainId;
  data: Partial<GASState>;
}

export type Action = SetStateCall;

function stateReducer(state: GASState = {}, action: Action) {
  let chainState = state[action.chainId] ?? {};
  if (action.type === 'SET_STATE') {
    return {
      ...state,
      [action.chainId]: { ...chainState, ...action.data },
    };
  }
}

const context = createContext<GASState>({});

export function GASDataProvider({ children }: GASDataProviderProps) {
  const { library, chainId } = useEthers();
  const { currentAccount } = useWeb3ConnectionsContext();
  const { readOnlyChainIds } = useConfig();

  const [state, dispatchState] = useReducer(stateReducer, {});

  if (readOnlyChainIds) {
    for (const readOnlyChainId of readOnlyChainIds) {
      const blockData: {
        library?: Web3Provider;
        chainId?: ChainId;
      } = {};
      try {
        const { library: fallbackLibrary, chainId: fallbackChainId } =
          useEthers(CHAIN_NAMES[readOnlyChainId]);
        blockData.library = fallbackLibrary;
        blockData.chainId = fallbackChainId;
      } catch (_) {}

      if (blockData.chainId == chainId && library) {
        blockData.library = library;
      }
    }
  }

  const debouncedState = useDebounce(state, 100);

  return (
    <context.Provider value={debouncedState ?? {}}>{children}</context.Provider>
  );
}

export default GASDataProvider;

export const useGASData = (chainId?: ChainId) => {
  const gasDataContext = useContext(context);
  const { defaultChainId } = useConfig();

  return chainId ? gasDataContext[chainId] : gasDataContext[defaultChainId];
};
