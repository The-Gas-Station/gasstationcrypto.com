import { useEffect, useState } from 'react';
import { NetworkConnector } from '@web3-react/network-connector';
import useEthers from '../hooks/useEthers';
import useDebounce from '../hooks/useDebounce';
import { useConfig } from './ConfigProvider';
import {
  useWeb3ConnectionsContext,
  ConnectorNames,
  CONNECTOR_KEY,
} from './Web3ConnectionsProvider';
import { CHAIN_NAMES } from '../constants/chains';

import useLocalStorage from '../hooks/useLocalStorage';

export function NetworkActivator() {
  const [storedConnector, setStoredConnector] = useLocalStorage<ConnectorNames>(
    CONNECTOR_KEY,
    ConnectorNames.None,
  );

  const { account, activate, active, chainId, connector, error } = useEthers();
  const { readOnlyChainIds, defaultChainId, autoSwitch, supportedChainIds } =
    useConfig();
  const {
    currentChainId,
    chainRpcUrls,
    getConnectors,
    setCurrentAccount,
    setCurrentChainId,
  } = useWeb3ConnectionsContext();

  useEffect(() => {
    setCurrentAccount(account ?? '');
    if (autoSwitch) {
      setCurrentChainId(
        chainId && supportedChainIds.includes(chainId)
          ? chainId
          : defaultChainId,
      );
    }
  }, [account, chainId, defaultChainId]);

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const { Injected, WalletConnect, WalletLink, DeFiConnect } =
    getConnectors(currentChainId);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const [tried, setTried] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const isSupportedConnectorId =
        Object.values(ConnectorNames).includes(storedConnector) &&
        storedConnector != ConnectorNames.None;

      let connector: any;

      if (isSupportedConnectorId) {
        switch (storedConnector) {
          case ConnectorNames.Injected:
            connector = Injected;
            break;
          case ConnectorNames.WalletConnect:
            connector = WalletConnect;
            break;
          case ConnectorNames.WalletLink:
            connector = WalletLink;
            break;
          case ConnectorNames.DeFiConnect:
            connector = DeFiConnect;
            break;
        }

        if (connector) {
          return activate(connector, undefined, true).catch(() => {
            setStoredConnector(ConnectorNames.None);
            setTried(true);
          });
        }
      }

      Injected.isAuthorized().then((isAuthorized: boolean) => {
        if (isAuthorized) {
          return activate(Injected, undefined, true)
            .then(() => {
              setStoredConnector(ConnectorNames.Injected);
            })
            .catch(() => {
              setTried(true);
            });
        } else {
          setTried(true);
        }
      });
    }, 0);

    return () => clearTimeout(timeout);
  }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  const suppress = !tried || !!activatingConnector;
  useEffect((): any => {
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(Injected);
      };
      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        activate(Injected);
      };
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          activate(Injected);
        }
      };

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);

  const toActivate = [];

  if (readOnlyChainIds) {
    for (const readOnlyChainId of readOnlyChainIds) {
      try {
        const {
          activate,
          chainId: connectedChainId,
          active,
          connector,
        } = useEthers(CHAIN_NAMES[readOnlyChainId]);

        if (
          !active ||
          (connector instanceof NetworkConnector &&
            connectedChainId !== readOnlyChainId)
        ) {
          toActivate.push(() => {
            activate(
              new NetworkConnector({
                defaultChainId: readOnlyChainId,
                urls: chainRpcUrls || [],
              }),
            );
          });
        }
      } catch (_) {}
    }
  }

  const debouncedToActivate = useDebounce(toActivate, 50);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      for (const call of debouncedToActivate) {
        await call();
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [debouncedToActivate]);

  return null;
}

export default NetworkActivator;
