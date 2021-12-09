import { BigNumber } from '@ethersproject/bignumber';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';
import useLiquidityPairRatio from '../library/hooks/useLiquidityPairRatio';
import useGASTokenPrice from './useGASTokenPrice';
import useTokenDecimals from '../library/hooks/useTokenDecimals';
import { ChainId, WRAPPED_ETHER_ADDRESSES } from '../library/constants/chains';
import BUFFER from '../library/constants/percisionBuffer';

import { CHAIN_INFO } from '../configs';

export function useTokenPrice(
  chainId?: ChainId,
  tokenAddress?: string,
  amount?: BigNumber,
): BigNumber {
  const { currentChainId } = useWeb3ConnectionsContext();
  const chainData = CHAIN_INFO[chainId ?? currentChainId];

  const { ratio: etherRatio, token1 } = useLiquidityPairRatio(
    chainId ?? currentChainId,
    chainData.etherLiquidityPair?.substring(4),
    WRAPPED_ETHER_ADDRESSES[chainId ?? currentChainId],
  );

  const decimals = useTokenDecimals(chainId ?? currentChainId, token1);

  const gasTokenPrice = useGASTokenPrice(chainId);

  const { ratio, percent1 } = useLiquidityPairRatio(
    chainId ?? currentChainId,
    tokenAddress,
    chainData.gasTokenAddress?.substring(4),
    false,
  );

  if (
    tokenAddress?.toLowerCase() ==
    WRAPPED_ETHER_ADDRESSES[chainId ?? currentChainId].toLowerCase()
  ) {
    return amount && etherRatio && decimals
      ? amount
          .mul(etherRatio.mul(BigNumber.from(10).pow(18 - decimals)))
          .div(BUFFER)
      : BigNumber.from(0);
  }

  if (tokenAddress?.toLowerCase() == token1?.toLowerCase()) {
    return amount ? amount : BigNumber.from(0);
  }

  if (
    tokenAddress?.toLowerCase() ==
    chainData.gasTokenAddress?.substring(4).toLowerCase()
  ) {
    return amount
      ? amount.mul(gasTokenPrice).div(BigNumber.from(10).pow(18))
      : BigNumber.from(0);
  }

  return amount && etherRatio && decimals && ratio && percent1
    ? amount
        .mul(percent1)
        .mul(etherRatio.mul(BigNumber.from(10).pow(18 - decimals)))
        .mul(2)
        .div(BUFFER)
        .div(BUFFER)
    : BigNumber.from('0');
}

export default useTokenPrice;
