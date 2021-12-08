import _ from 'lodash';

import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';
import useNomicsData from '../library/hooks/useNomicsData';
import { ChainId } from '../library/constants/chains';

import { CHAIN_INFO } from '../configs';

export function useGASToken30DayVolume(chainId?: ChainId): string {
  const { currentChainId } = useWeb3ConnectionsContext();
  const chainData = CHAIN_INFO[chainId ?? currentChainId];

  return '';

  const nomicsData = useNomicsData('', chainData.gasTokenName);

  return _.get(nomicsData, '0.30d.volume', '0');
}

export default useGASToken30DayVolume;
