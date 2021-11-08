import { useEffect, useState } from 'react';
import { NetworkConnector } from '@web3-react/network-connector';
import useEthers from '../hooks/useEthers';
import useDebounce from '../hooks/useDebounce';
import { useConfig } from './ConfigProvider';
import { useWeb3ConnectionsContext } from './Web3ConnectionsProvider';
import { CHAIN_NAMES } from '../constants/chains';

export function NetworkActivator() {
  const { activate, active, connector, error } = useEthers();
  const { readOnlyChainIds } = useConfig();
  const { currentChainId, chainRpcUrls, getConnectors } =
    useWeb3ConnectionsContext();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const { Injected } = getConnectors(currentChainId);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const [tried, setTried] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      Injected.isAuthorized().then((isAuthorized: boolean) => {
        if (isAuthorized) {
          return activate(Injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      });
    }, 0);

    return () => clearTimeout(timeout);
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

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
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId);
        activate(Injected);
      };

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
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
