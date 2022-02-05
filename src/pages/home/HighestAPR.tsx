import { useEffect, useState } from 'react';

import useDebounce from '../../library/hooks/useDebounce';
import { useActivePools } from '../../hooks/useActivePools';

import numeral from 'numeral';
import { useWeb3ConnectionsContext } from '../../library/providers/Web3ConnectionsProvider';
import { CHAIN_INFO } from '../../configs';

const HighestAPR = () => {
  const { currentChainId } = useWeb3ConnectionsContext();

  const chainData = CHAIN_INFO[currentChainId];

  const [highestAPR, setHighestAPR] = useState<number>(0);
  const activePoolAPRs = useActivePools(currentChainId).map((p) => p.apr);

  const debouncedActivePoolAPRs = useDebounce(activePoolAPRs, 50);

  useEffect(() => {
    setHighestAPR(debouncedActivePoolAPRs.sort((a, b) => b - a)[0] || 0);
  }, [JSON.stringify(debouncedActivePoolAPRs)]);

  return (
    <p>
      Earn up to {numeral(highestAPR).format('0.00%')} APR on{' '}
      {chainData.display}!
    </p>
  );
};

export default HighestAPR;
