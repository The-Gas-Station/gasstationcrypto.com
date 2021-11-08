import { useEffect, useState } from 'react';
import useEthers from './useEthers';
import { ChainId, CHAIN_NAMES } from '../constants/chains';

export function useLookupAddress(chainId: ChainId | undefined) {
  const { account, library } = useEthers(
    !chainId ? undefined : CHAIN_NAMES[chainId],
  );
  const [ens, setEns] = useState<string | null>();

  useEffect(() => {
    let mounted = true;

    if (account && library) {
      library
        ?.lookupAddress(account)
        .then((name) => {
          if (mounted) {
            setEns(name);
          }
        })
        .catch(() => setEns(null));
    }

    return () => {
      mounted = false;
    };
  }, [account, library, chainId]);

  return ens;
}

export default useLookupAddress;
