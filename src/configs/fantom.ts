import { ChainId } from '../library/constants/chains';
import { ChainInfo, PoolType } from './declarations';

export const CHAIN_INFO: ChainInfo = {
  chainId: ChainId.Fantom,
  etherCoingeckoId: 'fantom',
  gasTokenAddress: '0x6741db012578615Ee07e029C1062B46730093912',
  liquidityPairs: ['0x2ae4249f5a33a3ceadc10ddcbc5a9e8abe7680ef'],
  tokens: [],
  pools: {
    '0xFb6db9c955a2F1062b5584AbCEE8Cf4c975896F6': PoolType.DoubleV1,
    '0xfA44e0Bf61c46221BFfAa60F59E82e2319491929': PoolType.SingleV2,
    '0xe16D22501049Ebdd9bE44DDE377ffe2E945dF017': PoolType.SingleV2,
    '0xcC9808bC4Dc0115fBC8C3B9C99f900aD470e2d0D': PoolType.SingleV2,
  },
};

export default CHAIN_INFO;
