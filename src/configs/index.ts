import { Config } from '../library/models/config/Config';
import { ChainInfo } from './declarations';
export { PoolType } from './declarations';

import BSC_CHAIN_INFO from './bsc.json';
import POLYGON_CHAIN_INFO from './polygon.json';
import FANTOM_CHAIN_INFO from './fantom.json';
import CRONOS_CHAIN_INFO from './cronos.json';
import AVAX_CHAIN_INFO from './avax.json';
import MOVR_CHAIN_INFO from './movr.json';

export const CHAIN_INFO: { [chainId: number]: ChainInfo } = {
  [BSC_CHAIN_INFO.chainId]: BSC_CHAIN_INFO as ChainInfo,
  [POLYGON_CHAIN_INFO.chainId]: POLYGON_CHAIN_INFO as ChainInfo,
  [FANTOM_CHAIN_INFO.chainId]: FANTOM_CHAIN_INFO as ChainInfo,
  [CRONOS_CHAIN_INFO.chainId]: CRONOS_CHAIN_INFO as ChainInfo,
  [AVAX_CHAIN_INFO.chainId]: AVAX_CHAIN_INFO as ChainInfo,
  [MOVR_CHAIN_INFO.chainId]: MOVR_CHAIN_INFO as ChainInfo,
};

const chainIds = [
  BSC_CHAIN_INFO.chainId,
  POLYGON_CHAIN_INFO.chainId,
  FANTOM_CHAIN_INFO.chainId,
  CRONOS_CHAIN_INFO.chainId,
  AVAX_CHAIN_INFO.chainId,
  MOVR_CHAIN_INFO.chainId,
];

export const AppConfig: Config = {
  defaultChainId: chainIds[0],
  readOnlyChainIds: chainIds,
  supportedChainIds: chainIds,
};
