import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { providers } from 'ethers';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { UnsupportedChainIdError } from '@web3-react/core';
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
  WalletConnectConnector,
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
} from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { DeFiConnector } from 'deficonnect';
import sample from 'lodash.sample';

import { ChainId, CHAIN_NAMES } from '../constants/chains';
import { useConfig } from './ConfigProvider';

import useLocalStorage from '../hooks/useLocalStorage';

export enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
  WalletLink = 'WalletLink',
  DeFiConnect = 'DeFiConnect',
}

interface Web3ConnectionsProviderProps {
  children: ReactNode;
}

const context = createContext<{
  currentChainId: ChainId;
  currentAccount: string;
  chainRpcUrls: { [chainId: number]: string };
  getConnectors: (chainId: ChainId) => {
    [connectorName in ConnectorNames]: any;
  };
  getErrorMessage: (error: Error) => string;
  setCurrentChainId: (chainId: ChainId) => void;
  setCurrentAccount: (account: string) => void;
}>({
  currentChainId: ChainId.Mainnet,
  currentAccount: '',
  chainRpcUrls: {},
  getConnectors: () => ({
    Injected: null,
    WalletConnect: null,
    WalletLink: null,
    DeFiConnect: null,
  }),
  getErrorMessage: () => '',
  setCurrentChainId: () => undefined,
  setCurrentAccount: () => undefined,
});

export function Web3ConnectionsProvider({
  children,
}: Web3ConnectionsProviderProps) {
  const {
    defaultChainId,
    supportedChainIds,
    readOnlyChainIds,
    rpcUrls,
    pollingInterval,
  } = useConfig();

  const [_defaultChainId, setDefaultChainId] = useLocalStorage(
    'CHAIN_ID',
    defaultChainId,
  );

  const [currentChainId, setCurrentChainId] = useState(
    supportedChainIds.includes(_defaultChainId)
      ? _defaultChainId
      : defaultChainId,
  );
  const [currentAccount, setCurrentAccount] = useState('');

  const getReadOnlyLibrary = useCallback(
    (provider: any): providers.Provider => {
      const library = new providers.StaticJsonRpcProvider(provider);
      library.pollingInterval = pollingInterval || 15000;
      return library;
    },
    [pollingInterval],
  );

  const getLibrary = useCallback(
    (provider: any): providers.Provider => {
      const library = new providers.Web3Provider(provider);
      library.pollingInterval = pollingInterval || 15000;
      return library;
    },
    [pollingInterval],
  );

  const getErrorMessage = useCallback((error: Error) => {
    if (error instanceof NoEthereumProviderError) {
      return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
    } else if (error instanceof UnsupportedChainIdError) {
      return "You're connected to an unsupported network.";
    } else if (
      error instanceof UserRejectedRequestErrorInjected ||
      error instanceof UserRejectedRequestErrorWalletConnect
    ) {
      return 'Please authorize this website to access your Ethereum account.';
    } else {
      console.error(error);
      return 'An unknown error occurred. Check the console for more details.';
    }
  }, []);

  const chainRpcUrls = useMemo(() => {
    const rpcs: { [chainId: number]: string } = {};

    if (rpcUrls) {
      Object.keys(rpcUrls)
        .map((v) => parseInt(v))
        .filter((v) => !isNaN(v))
        .forEach((chainId) => {
          const rpcUrl = sample(rpcUrls[chainId]);

          if (rpcUrl) {
            rpcs[chainId] = rpcUrl;
          }
        });
    }

    return rpcs;
  }, [rpcUrls]);

  const getConnectors = useCallback(
    (
      chainId: ChainId,
    ): {
      [connectorName in ConnectorNames]: any;
    } => {
      const injected = new InjectedConnector({});

      const walletconnect = new WalletConnectConnector({
        rpc: chainRpcUrls,
        qrcode: true,
        chainId,
        supportedChainIds,
      });

      const walletlink = new WalletLinkConnector({
        url: chainRpcUrls[chainId],
        appName: 'The Gas Station',
        supportedChainIds: [chainId],
      });

      const deFiConnect = new DeFiConnector({
        name: 'The Gas Station',
        supprtedChainTypes: ['cosmos'],
        cosmos: {
          supportedChainIds: supportedChainIds.map((chain) => chain.toString()),
        },
      });

      return {
        [ConnectorNames.Injected]: injected,
        [ConnectorNames.WalletConnect]: walletconnect,
        [ConnectorNames.WalletLink]: walletlink,
        [ConnectorNames.DeFiConnect]: deFiConnect,
      };
    },
    [chainRpcUrls, supportedChainIds],
  );

  const [readOnlyProviders, setReadOnlyProviders] = useState<any>({});

  useEffect(() => {
    const providers: any = {};
    if (readOnlyChainIds) {
      for (const readOnlyChainId of readOnlyChainIds) {
        if (!CHAIN_NAMES[readOnlyChainId]) {
          console.error(`ChainId not configured: ${readOnlyChainId}`);
          continue;
        }

        if (!readOnlyProviders[CHAIN_NAMES[readOnlyChainId]]) {
          console.log(CHAIN_NAMES[readOnlyChainId]);
          providers[CHAIN_NAMES[readOnlyChainId]] = createWeb3ReactRoot(
            CHAIN_NAMES[readOnlyChainId],
          );
        }
      }
    }

    setReadOnlyProviders({ ...readOnlyProviders, ...providers });
  }, [readOnlyChainIds]);

  let readOnlyProvider = children;

  if (readOnlyChainIds) {
    for (const readOnlyChainId of readOnlyChainIds) {
      if (!CHAIN_NAMES[readOnlyChainId]) {
        console.error(`ChainId not configured: ${readOnlyChainId}`);
        continue;
      }

      if (readOnlyProviders[CHAIN_NAMES[readOnlyChainId]]) {
        const Web3ReactProviderReadOnly =
          readOnlyProviders[CHAIN_NAMES[readOnlyChainId]];

        readOnlyProvider = (
          <Web3ReactProviderReadOnly
            key={CHAIN_NAMES[readOnlyChainId]}
            getLibrary={getReadOnlyLibrary}
          >
            {readOnlyProvider}
          </Web3ReactProviderReadOnly>
        );
      }
    }
  }

  return (
    <context.Provider
      value={{
        currentChainId,
        setCurrentChainId: (chainId: ChainId) => {
          setDefaultChainId(chainId);
          setCurrentChainId(chainId);
        },
        currentAccount,
        setCurrentAccount,
        chainRpcUrls,
        getConnectors,
        getErrorMessage,
      }}
    >
      <Web3ReactProvider getLibrary={getLibrary}>
        {readOnlyProvider}
      </Web3ReactProvider>
    </context.Provider>
  );
}

export default Web3ConnectionsProvider;

export const useWeb3ConnectionsContext = () => useContext(context);
