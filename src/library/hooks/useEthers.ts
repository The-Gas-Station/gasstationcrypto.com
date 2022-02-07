import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ChainId } from '../constants/chains';
import { useCallback } from 'react';
import {
  useWeb3ConnectionsContext,
  ConnectorNames,
  CONNECTOR_KEY,
} from '../providers/Web3ConnectionsProvider';

import useLocalStorage from './useLocalStorage';

type ActivateBrowserWallet = (
  onError?: (error: Error) => void,
  throwErrors?: boolean,
) => Promise<void>;
type ActivateWalletConnect = (
  onError?: (error: Error) => void,
  throwErrors?: boolean,
) => Promise<void>;
type ActivateWalletLink = (
  onError?: (error: Error) => void,
  throwErrors?: boolean,
) => Promise<void>;
type ActivateDeFiConnect = (
  onError?: (error: Error) => void,
  throwErrors?: boolean,
) => Promise<void>;

export type Web3Ethers = ReturnType<typeof useWeb3React> & {
  library?: Web3Provider;
  chainId?: ChainId;
  activateBrowserWallet: ActivateBrowserWallet;
  activateWalletConnect: ActivateWalletConnect;
  activateWalletLink: ActivateWalletLink;
  activateDeFiConnect: ActivateDeFiConnect;
};

export function useEthers(key?: string | undefined): Web3Ethers {
  const [, setStoredConnector] = useLocalStorage<ConnectorNames>(
    CONNECTOR_KEY,
    ConnectorNames.None,
  );

  const result = useWeb3React<Web3Provider>(key);
  const { currentChainId, getConnectors } = useWeb3ConnectionsContext();

  const activateBrowserWallet = useCallback<ActivateBrowserWallet>(
    async (onError, throwErrors) => {
      const { Injected } = getConnectors(currentChainId);

      const handleError = (err: Error) => {
        if (onError instanceof Function) {
          onError(err);
        }

        setStoredConnector(ConnectorNames.None);
      };

      try {
        await result.activate(Injected, handleError, throwErrors);
      } catch (err) {
        setStoredConnector(ConnectorNames.None);
        throw err;
      }

      setStoredConnector(ConnectorNames.Injected);
    },
    [currentChainId, getConnectors],
  );

  const activateWalletConnect = useCallback<ActivateWalletConnect>(
    async (onError, throwErrors) => {
      const { WalletConnect } = getConnectors(currentChainId);

      const handleError = (err: Error) => {
        if (onError instanceof Function) {
          onError(err);
        }

        setStoredConnector(ConnectorNames.None);
      };

      try {
        await result.activate(WalletConnect, handleError, throwErrors);
      } catch (err) {
        setStoredConnector(ConnectorNames.None);
        throw err;
      }

      setStoredConnector(ConnectorNames.WalletConnect);
    },
    [currentChainId, getConnectors],
  );

  const activateWalletLink = useCallback<ActivateWalletLink>(
    async (onError, throwErrors) => {
      const { WalletLink } = getConnectors(currentChainId);

      const handleError = (err: Error) => {
        if (onError instanceof Function) {
          onError(err);
        }

        setStoredConnector(ConnectorNames.None);
      };

      try {
        await result.activate(WalletLink, handleError, throwErrors);
      } catch (err) {
        setStoredConnector(ConnectorNames.None);
        throw err;
      }

      setStoredConnector(ConnectorNames.WalletLink);
    },
    [currentChainId, getConnectors],
  );

  const activateDeFiConnect = useCallback<ActivateDeFiConnect>(
    async (onError, throwErrors) => {
      const { DeFiConnect } = getConnectors(currentChainId);

      const handleError = (err: Error) => {
        if (onError instanceof Function) {
          onError(err);
        }

        setStoredConnector(ConnectorNames.None);
      };

      try {
        await result.activate(DeFiConnect, handleError, throwErrors);
      } catch (err) {
        setStoredConnector(ConnectorNames.None);
        throw err;
      }

      setStoredConnector(ConnectorNames.DeFiConnect);
    },
    [currentChainId, getConnectors],
  );

  return {
    ...result,
    activateBrowserWallet,
    activateWalletConnect,
    activateWalletLink,
    activateDeFiConnect,
  };
}

export default useEthers;
