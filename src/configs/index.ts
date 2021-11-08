import { Config } from '../library/models/config/Config';

import BSC_CHAIN_INFO from './bsc';
import POLYGON_CHAIN_INFO from './polygon';
import FANTOM_CHAIN_INFO from './fantom';

export const CHAIN_INFO = {
  [BSC_CHAIN_INFO.chainId]: BSC_CHAIN_INFO,
  [POLYGON_CHAIN_INFO.chainId]: POLYGON_CHAIN_INFO,
  [FANTOM_CHAIN_INFO.chainId]: FANTOM_CHAIN_INFO,
};

const chainIds = Object.keys(CHAIN_INFO).map((v) => parseInt(v));

export const AppConfig: Config = {
  defaultChainId: chainIds[0],
  readOnlyChainIds: chainIds,
  supportedChainIds: chainIds,
};
