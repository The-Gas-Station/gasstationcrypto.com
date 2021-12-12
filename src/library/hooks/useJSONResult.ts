import { useEffect, useState } from 'react';

export const useJSONResult = (url: string): any => {
  const [result, setResult] = useState<any>(undefined);

  useEffect(() => {
    async function getResult() {
      try {
        const data = await window.fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await data.json();
        setResult(result);
      } catch (_) {
        setResult(undefined);
      }
    }

    if (url) {
      getResult();
    } else {
      setResult(undefined);
    }
  }, [url]);

  return result;
};

export default useJSONResult;
