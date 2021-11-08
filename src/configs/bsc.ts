import { ChainId } from '../library/constants/chains';
import { ChainInfo, PoolType } from './declarations';

export const CHAIN_INFO: ChainInfo = {
  chainId: ChainId.BSC,
  gasTokenAddress: '0x6fabfe7946b23da23ad51dc45167cc2cfd0ce70e',
  liquidityPairs: [
    '0xfB6f376B990ae3fc3Cfa2Ce1cB1A796c5895AcBa',
    '0x340db2a8E77aD047e5E786c94dB0aE1593082264',
  ],
  tokens: [],
  pools: {
    '0xD9D8209dC88CB96D0a300C2ab2479608A8D1463d': PoolType.SingleV1,
    '0x0124378207aF3E62D842f66B5af02dF5e4F9719C': PoolType.SingleV1,
    '0x8a96E5E22e2b057b9c7e7474B95D02bd9B2D0628': PoolType.SingleV1,
    '0xB1B058236C20A808Bd2277DB4C0D092468e6b626': PoolType.DoubleV1,
    '0xE9916A99787b9f8a86116d86f900e18aF0a2aA51': PoolType.SingleV2,
    '0xE35408BCD80Ab6A2954fD2858Ef4B96F2Da83F75': PoolType.SingleV2,
    '0x09c85d6F3b9Aa02314A839E69d6725A050678AbE': PoolType.SingleV2,
    '0x50fb6f7e75476b3493cab540201fbafb70c915fc': PoolType.SingleV2,
    '0x7213d547415284b95b0d7b01f11f351546678916': PoolType.SingleV2,
  },
};

export default CHAIN_INFO;
