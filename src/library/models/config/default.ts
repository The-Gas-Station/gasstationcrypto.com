import { ChainId, RPC_URLS } from '../../constants/chains';
import { FullConfig } from './Config';

export const DEFAULT_CONFIG: FullConfig = {
  defaultChainId: ChainId.Mainnet,
  readOnlyChainIds: [],
  rpcUrls: RPC_URLS,
  autoSwitch: true,
  pollingInterval: 15000,
  supportedChainIds: [
    ChainId.Mainnet,
    ChainId.Goerli,
    ChainId.Kovan,
    ChainId.Rinkeby,
    ChainId.Ropsten,
    ChainId.BSC,
    ChainId.BSCTestnet,
    ChainId.xDai,
    ChainId.Localhost,
    ChainId.Hardhat,
    ChainId.Polygon,
    ChainId.Mumbai,
    ChainId.Theta,
    ChainId.ThetaTestnet,
    ChainId.Harmony,
    ChainId.Moonriver,
    ChainId.Palm,
    ChainId.Fantom,
  ],
  notifications: {
    checkInterval: 500,
    expirationPeriod: 5000,
  },
  localStorage: {
    transactionPath: 'transactions',
  },
};
