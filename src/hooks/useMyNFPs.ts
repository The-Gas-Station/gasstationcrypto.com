import { useEffect, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';

import { NFPInterface } from '../constants';
import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';
import useContractCall, {
  useContractCalls,
} from '../library/hooks/useContractCall';

import { CHAIN_INFO } from '../configs';

export function useMyNFPs() {
  const [result, setResult] = useState<
    { chainId: number; tokenId: number; image: string; name: string }[]
  >([]);

  const { readOnlyChainIds } = useConfig();
  const { currentAccount } = useWeb3ConnectionsContext();

  if (readOnlyChainIds) {
    for (const chainId of readOnlyChainIds) {
      const chainData = CHAIN_INFO[chainId];

      if (!chainData.nfpAddress) {
        continue;
      }

      const [tokenIds] = useContractCall(
        chainId,
        currentAccount && {
          abi: NFPInterface,
          address: chainData.nfpAddress.substring(4),
          method: 'getNFPsOfOwner',
          args: [currentAccount],
        },
      ) ?? [[]];

      const tokenUris = (
        useContractCalls(chainId, [
          ...tokenIds.map(
            (tokenId: BigNumber) =>
              chainData.nfpAddress && {
                abi: NFPInterface,
                address: chainData.nfpAddress.substring(4),
                method: 'tokenURI',
                args: [tokenId],
              },
          ),
        ]) ?? []
      ).map((tokenUri) => (tokenUri ? tokenUri[0] : undefined) ?? undefined);

      useEffect(() => {
        async function getResult(tokenId: BigNumber, url: string) {
          try {
            const data = await window.fetch(url);
            const metadata = await data.json();
            setResult((prev) => {
              prev = prev.filter(
                (nfp) =>
                  nfp.chainId != chainId || nfp.tokenId != tokenId.toNumber(),
              );
              const { tokenId: rarityTokenId, ...noTokenIdMetadata } = metadata;
              prev.push({
                tokenId: tokenId.toNumber(),
                rarityTokenId,
                chainId,
                ...noTokenIdMetadata,
              });

              return prev.sort((a, b) => {
                if (a.image.includes('gif') && b.image.includes('gif')) {
                  return a.tokenId - b.tokenId;
                }

                if (a.image.includes('gif')) {
                  return -1;
                }

                if (b.image.includes('gif')) {
                  return 1;
                }

                if (!a.name.includes('Common') && !b.name.includes('Common')) {
                  return a.tokenId - b.tokenId;
                }

                if (!a.name.includes('Common')) {
                  return -1;
                }

                if (!b.name.includes('Common')) {
                  return 1;
                }

                return a.tokenId - b.tokenId;
              });
            });
          } catch (_) {}
        }

        tokenIds.forEach((tokenId: BigNumber, i: number) => {
          if (tokenUris[i]) {
            getResult(tokenId, tokenUris[i]);
          }
        });
      }, [JSON.stringify(tokenIds), JSON.stringify(tokenUris)]);
    }
  }

  return result;
}

export default useMyNFPs;
