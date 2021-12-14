export enum PoolType {
  SingleV1 = 'SingleV1',
  SingleV2 = 'SingleV2',
  DoubleV1 = 'DoubleV1',
}

export type ChainInfoPoolSingle = {
  name: string;
  address: string;
  type: PoolType.SingleV1 | PoolType.SingleV2;
  stakeIcon: string;
  reward0Icon: string;
  stakeSymbol?: string;
  rewardSymbols?: string[];
};

export type ChainInfoPoolDouble = {
  name: string;
  address: string;
  type: PoolType.DoubleV1;
  stakeIcon: string;
  reward0Icon: string;
  reward1Icon: string;
  stakeSymbol?: string;
  rewardSymbols?: string[];
};

export type ChainInfoPool = ChainInfoPoolSingle | ChainInfoPoolDouble;

export type ChainInfo = {
  name: string;
  display: string;
  tokenImage: string;
  launched: boolean;
  launchDate?: string;
  chainId: number;
  etherCoingeckoId?: string;
  etherLiquidityPair?: string;
  gasTokenName: string;
  gasTokenAddress?: string;
  liquidityPairs?: {
    name: string;
    address: string;
  }[];
  tokens?: { name: string; address: string }[];
  pools?: ChainInfoPool[];
  nfpAddress?: string;
  nfpGitHubBaseURL?: string;
  buyAddress?: string;
  chartAddress?: string;
};
