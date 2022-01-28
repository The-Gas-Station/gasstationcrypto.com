import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { PoolData } from '../../hooks/Pools';
import { useActivePools } from '../../hooks/useActivePools';

const formatAPR = (apr: number): string => numeral(apr).format('0.00%');

export function getHighestAPRPool(pools: PoolData[]): number {
  const aprs = pools.map((p) => p.apr);
  const orderedAPRs = aprs.sort((a, b) => b - a);
  const highestAPR = orderedAPRs.shift() || 0;
  return highestAPR;
}

const HighestAPR = () => {
  const [highestAPR, setHighestAPR] = useState<number>(0);
  const activePools = useActivePools();
  useEffect(() => {
    const currentHighestAPR = getHighestAPRPool(activePools);
    setHighestAPR(currentHighestAPR);
  }, [...activePools, highestAPR]);
  return <p>Earn up to {formatAPR(highestAPR)} APR in our reward hub!</p>;
};

export default HighestAPR;
