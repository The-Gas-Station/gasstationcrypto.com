export enum PoolType {
  SingleV1,
  SingleV2,
  DoubleV1,
}

export type ChainInfo = {
  chainId: number;
  etherCoingeckoId: string;
  gasTokenAddress: string;
  liquidityPairs: string[];
  tokens: string[];
  pools: { [address: string]: PoolType };
};
