import { useEffect, useState } from 'react';

import { getNomicsData } from '../helpers/fetchNomicsData';

export const useNomicsData = (
  apiKey: string,
  id: string,
): string | undefined => {
  const [data, setData] = useState<any>(undefined);

  useEffect(() => {
    async function getData() {
      const tokenData = await getNomicsData(apiKey, id);
      setData(tokenData);
    }

    getData();
  }, [apiKey, id]);

  return data;
};

export default useNomicsData;
