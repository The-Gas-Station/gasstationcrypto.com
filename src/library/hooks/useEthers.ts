import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ChainId } from '../constants/chains';
import { useCallback } from 'react';
import { useWeb3ConnectionsContext } from '../providers/Web3ConnectionsProvider';

type ActivateBrowserWallet = (
  onError?: (error: Error) => void,
  throwErrors?: boolean,
) => Promise<void>;
type ActivateWalletConnect = (
  onError?: (error: Error) => void,
  throwErrors?: boolean,
) => Promise<void>;

export type Web3Ethers = ReturnType<typeof useWeb3React> & {
  library?: Web3Provider;
  chainId?: ChainId;
  activateBrowserWallet: ActivateBrowserWallet;
  activateWalletConnect: ActivateWalletConnect;
};

export function useEthers(key?: string | undefined): Web3Ethers {
  const result = useWeb3React<Web3Provider>(key);
  const { currentChainId, getConnectors } = useWeb3ConnectionsContext();

  const activateBrowserWallet = useCallback<ActivateBrowserWallet>(
    async (onError, throwErrors) => {
      const { Injected } = getConnectors(currentChainId);

      if (onError instanceof Function) {
        await result.activate(Injected, onError, throwErrors);
      } else {
        await result.activate(Injected, undefined, throwErrors);
      }
    },
    [currentChainId, getConnectors],
  );

  const activateWalletConnect = useCallback<ActivateWalletConnect>(
    async (onError, throwErrors) => {
      const { WalletConnect } = getConnectors(currentChainId);

      if (onError instanceof Function) {
        await result.activate(WalletConnect, onError, throwErrors);
      } else {
        await result.activate(WalletConnect, undefined, throwErrors);
      }
    },
    [currentChainId, getConnectors],
  );

  return { ...result, activateBrowserWallet, activateWalletConnect };
}

export default useEthers;
