export enum PoolType {
  SingleV1 = 'SingleV1',
  SingleV2 = 'SingleV2',
  DoubleV1 = 'DoubleV1',
}

export type ChainInfo = {
  chainId: number;
  etherCoingeckoId: string;
  gasTokenAddress: string;
  liquidityPairs: { name: string; address: string }[];
  tokens: { name: string; address: string }[];
  pools: { name: string; address: string; type: PoolType }[];
};
