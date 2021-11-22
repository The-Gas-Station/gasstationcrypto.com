import { ReactNode } from 'react';
import { MULTICALL_ADDRESSES } from '../constants/chains';
import { Config } from '../models/config/Config';
import { ConfigProvider } from '../providers/ConfigProvider';
import { BlockNumberProvider } from './BlockNumberProvider';
import { ChainStateProvider } from './ChainStateProvider';
import { useConfig } from './ConfigProvider';
import { Web3ConnectionsProvider } from './Web3ConnectionsProvider';
import React from 'react';
import { NotificationsProvider } from './NotificationsProvider';
import { NetworkActivator } from './NetworkActivator';
import { TransactionProvider } from './TransactionsProvider';
import { LocalMulticallProvider } from './LocalMulticallProvider';

interface DAppProviderProps {
  children: ReactNode;
  config: Config;
}

export function DAppProvider({ config, children }: DAppProviderProps) {
  return (
    <ConfigProvider config={config}>
      <DAppProviderWithConfig>{children}</DAppProviderWithConfig>
    </ConfigProvider>
  );
}

interface WithConfigProps {
  children: ReactNode;
}

function DAppProviderWithConfig({ children }: WithConfigProps) {
  const { multicallAddresses } = useConfig();
  const multicallAddressesMerged = {
    ...MULTICALL_ADDRESSES,
    ...multicallAddresses,
  };

  return (
    <Web3ConnectionsProvider>
      <BlockNumberProvider>
        <NetworkActivator />
        <LocalMulticallProvider>
          <ChainStateProvider multicallAddresses={multicallAddressesMerged}>
            <NotificationsProvider>
              <TransactionProvider>{children}</TransactionProvider>
            </NotificationsProvider>
          </ChainStateProvider>
        </LocalMulticallProvider>
      </BlockNumberProvider>
    </Web3ConnectionsProvider>
  );
}

export default DAppProvider;
