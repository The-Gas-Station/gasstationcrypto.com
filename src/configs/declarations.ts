export enum PoolType {
  SingleV1 = 'SingleV1',
  SingleV2 = 'SingleV2',
  DoubleV1 = 'DoubleV1',
}

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
  liquidityPairs?: { name: string; address: string }[];
  tokens?: { name: string; address: string }[];
  pools?: { name: string; address: string; type: PoolType }[];
};
