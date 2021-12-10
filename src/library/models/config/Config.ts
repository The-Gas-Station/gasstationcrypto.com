import { ChainId } from '../../constants/chains';

export type NodeUrls = {
  [chainId: number]: string[];
};

export type MulticallAddresses = {
  [chainId: number]: string;
};

export type FullConfig = {
  defaultChainId: ChainId;
  readOnlyChainIds?: ChainId[];
  rpcUrls?: NodeUrls;
  multicallAddresses?: MulticallAddresses;
  supportedChainIds: ChainId[];
  autoSwitch: boolean;
  pollingInterval?: number;
  notifications: {
    checkInterval: number;
    expirationPeriod: number;
  };
  localStorage: {
    transactionPath: string;
  };
};

export type Config = Partial<FullConfig>;
