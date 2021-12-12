import pRetry from 'p-retry';
import PQueue from 'p-queue';

const queue = new PQueue({
  concurrency: 1,
  interval: 1000,
});

export const getNomicsDataUri = (apiKey: string, id: string) =>
  `https://api.nomics.com/v1/currencies/ticker?key=${apiKey}&interval=30d&ids=${id}`;

export const fetchNomicsData =
  (fetchFunction: any) => async (apiKey: string, id: string) => {
    try {
      const nomicsId = id.toUpperCase();
      const url = getNomicsDataUri(apiKey, nomicsId);
      return await queue.add(() =>
        pRetry(
          async () => {
            const data = await fetchFunction(url);
            return await data.json();
          },
          { retries: 5 },
        ),
      );
    } catch (_) {
      return undefined;
    }
  };

export default fetchNomicsData;

export const getNomicsData = fetchNomicsData(
  typeof window !== 'undefined' && window.fetch,
);
