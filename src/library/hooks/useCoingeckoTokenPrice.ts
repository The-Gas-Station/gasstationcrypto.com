import { useEffect, useState } from 'react';
import { useBlockNumber } from '../providers/BlockNumberProvider';

import { getCoingeckoTokenPrice } from '../helpers/fetchCoingeckoTokenPrice';

export const useCoingeckoTokenPrice = (
  contract: string,
  quote = 'usd',
  platform = 'ethereum',
): string | undefined => {
  const [price, setPrice] = useState<string | undefined>(undefined);
  const blockNo = useBlockNumber();

  useEffect(() => {
    async function getPrice() {
      const tokenPrice = await getCoingeckoTokenPrice(
        contract,
        quote,
        platform,
      );
      setPrice(tokenPrice);
    }

    getPrice();
  }, [contract, quote, platform, blockNo]);

  return price;
};

export default useCoingeckoTokenPrice;
