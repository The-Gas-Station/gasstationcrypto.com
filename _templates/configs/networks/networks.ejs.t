---
to: src/configs/index.ts
force: true
---

import { Config } from '../library/models/config/Config';
import { ChainInfo } from './declarations';
export { PoolType } from './declarations';

<% for (var network of networks) { -%>
import <%= h.changeCase.upper(network) %>_CHAIN_INFO from './<%= network %>.json';
<% } -%>

export const CHAIN_INFO: { [chainId: number]: ChainInfo } = {
<% for (var network of networks) { -%>
  [<%= h.changeCase.upper(network) %>_CHAIN_INFO.chainId]: <%= h.changeCase.upper(network) %>_CHAIN_INFO as ChainInfo,
<% } -%>
};

const chainIds = [
<% for (var network of networks) { -%>
  <%= h.changeCase.upper(network) %>_CHAIN_INFO.chainId,
<% } -%>
];

export const AppConfig: Config = {
  defaultChainId: chainIds[0],
  readOnlyChainIds: chainIds,
  supportedChainIds: chainIds,
  autoSwitch: false,
};
