import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ChainId } from '../constants/chains';
import { useCallback } from 'react';
import { useConfig } from '../providers/ConfigProvider';
import { InjectedConnector } from '@web3-react/injected-connector';

type ActivateBrowserWallet = (
  onError?: (error: Error) => void,
  throwErrors?: boolean,
) => void;

export type Web3Ethers = ReturnType<typeof useWeb3React> & {
  library?: Web3Provider;
  chainId?: ChainId;
  activateBrowserWallet: ActivateBrowserWallet;
};

export function useEthers(key?: string | undefined): Web3Ethers {
  const result = useWeb3React<Web3Provider>(key);
  const { supportedChainIds } = useConfig();
  const activateBrowserWallet = useCallback<ActivateBrowserWallet>(
    async (onError, throwErrors) => {
      const injected = new InjectedConnector({
        supportedChainIds,
      });
      if (onError instanceof Function) {
        await result.activate(injected, onError, throwErrors);
      } else {
        await result.activate(injected, undefined, throwErrors);
      }
    },
    [supportedChainIds],
  );
  return { ...result, activateBrowserWallet };
}

export default useEthers;
