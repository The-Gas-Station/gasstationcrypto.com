import { Config } from '../library/models/config/Config';
import { ChainInfo } from './declarations';

import BSC_CHAIN_INFO from './bsc.json';
import POLYGON_CHAIN_INFO from './polygon.json';
import FANTOM_CHAIN_INFO from './fantom.json';

export const CHAIN_INFO: { [chainId: number]: ChainInfo } = {
  [BSC_CHAIN_INFO.chainId]: BSC_CHAIN_INFO as ChainInfo,
  [POLYGON_CHAIN_INFO.chainId]: POLYGON_CHAIN_INFO as ChainInfo,
  [FANTOM_CHAIN_INFO.chainId]: FANTOM_CHAIN_INFO as ChainInfo,
};

const chainIds = Object.keys(CHAIN_INFO).map((v) => parseInt(v));

export const AppConfig: Config = {
  defaultChainId: chainIds[0],
  readOnlyChainIds: chainIds,
  supportedChainIds: chainIds,
};
