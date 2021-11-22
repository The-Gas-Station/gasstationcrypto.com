import { useBlockNumber } from '../providers/BlockNumberProvider';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import useEthers from './useEthers';
import { ChainId, CHAIN_NAMES } from '../constants/chains';

export function useGasPrice(
  chainId: ChainId | undefined,
): BigNumber | undefined {
  const { library } = useEthers(!chainId ? undefined : CHAIN_NAMES[chainId]);
  const blockNumber = useBlockNumber(chainId);
  const [gasPrice, setGasPrice] = useState<BigNumber | undefined>();

  async function updateGasPrice() {
    setGasPrice(await library?.getGasPrice());
  }

  useEffect(() => {
    updateGasPrice();
  }, [library, blockNumber, chainId]);

  return gasPrice;
}

export default useGasPrice;
