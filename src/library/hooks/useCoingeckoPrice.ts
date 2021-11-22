import { useEffect, useState } from 'react';
import { useBlockNumber } from '../providers/BlockNumberProvider';

import { getCoingeckoPrice } from '../helpers/fetchCoingeckoPrice';

export const useCoingeckoPrice = (
  base: string,
  quote = 'usd',
): string | undefined => {
  const [price, setPrice] = useState<string | undefined>(undefined);
  const blockNo = useBlockNumber();

  useEffect(() => {
    async function getPrice() {
      const tokenPrice = await getCoingeckoPrice(base, quote);
      setPrice(tokenPrice);
    }

    getPrice();
  }, [base, quote, blockNo]);

  return price;
};

export default useCoingeckoPrice;
