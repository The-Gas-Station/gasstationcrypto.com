import { ChainId } from '../library/constants/chains';
import { ChainInfo, PoolType } from './declarations';

export const CHAIN_INFO: ChainInfo = {
  chainId: ChainId.Polygon,
  etherCoingeckoId: 'wmatic',
  gasTokenAddress: '0x840b5fc8c6dee2b1140174a3abdc215190426ccf',
  liquidityPairs: [
    '0x2637ce16e98fcc66f2ccdd36087defdcf955b68a',
    '0x993e0342A307D0aC7E16d8b0ae0262F237EC1b4B',
  ],
  tokens: [],
  pools: {
    '0x2bc0bf8e98c7bbf08dd682b3ed0da50991aa66bd': PoolType.SingleV1,
    '0x20024f775ab6bc96077c73fb2e45c8862ac35552': PoolType.SingleV1,
    '0x543b1da3a789bd9e72142ce7b7b320dbd4ddea0a': PoolType.SingleV1,
    '0x38816Ccf336E53783d2661Ca8F6115b435ae74B3': PoolType.DoubleV1,
    '0xBE9bEAc00d0a495Cb3482Fb22a9dc874305262E2': PoolType.SingleV2,
    '0xE454a4262Cd345C4DA97B46AcAC7F8F2e6D3b3dD': PoolType.SingleV2,
    '0x196986cbD3E4C9Ff4372F419BC94C43B49dB0A0c': PoolType.SingleV2,
    '0xacc18870ffd0a260a80459deaf47628983ae96af': PoolType.SingleV2,
    '0xed303497b674bae2173a8d7d881f74ddb1553c17': PoolType.SingleV2,
  },
};

export default CHAIN_INFO;
