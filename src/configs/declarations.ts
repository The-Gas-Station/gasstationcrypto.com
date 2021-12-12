export enum PoolType {
  SingleV1 = 'SingleV1',
  SingleV2 = 'SingleV2',
  DoubleV1 = 'DoubleV1',
}

export type ChainInfoDoc = {
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
  pools?: {
    name: string;
    address: string;
    type: string;
    stakeIcon: string;
    rewardIcons: string[] | string;
    stakeSymbol?: string;
    rewardSymbols?: string[];
  }[];
  nfpAddress?: string;
  buyAddress?: string;
  chartAddress?: string;
};

export type ChainInfoPool = {
  name: string;
  address: string;
  type: PoolType;
  stakeIcon: string;
  rewardIcons: string[];
  stakeSymbol?: string;
  rewardSymbols?: string[];
};

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
  pools?: {
    name: string;
    address: string;
    type: PoolType;
    stakeIcon: string;
    rewardIcons: string[];
    stakeSymbol?: string;
    rewardSymbols?: string[];
  }[];
  nfpAddress?: string;
  buyAddress?: string;
  chartAddress?: string;
};

export function fixDoc(doc: ChainInfoDoc): ChainInfo {
  if (doc.pools) {
    for (let i = 0; i < doc.pools?.length; i++) {
      if (
        Object.prototype.toString.call(doc.pools[i].rewardIcons) ===
        '[object String]'
      ) {
        doc.pools[i].rewardIcons = [doc.pools[i].rewardIcons as string];
      }
    }
  }

  return doc as ChainInfo;
}
