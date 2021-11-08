import { useEffect, useState } from 'react';

export function useDebouncePair<T, U>(
  first: T,
  second: U,
  delay?: number,
): [T, U] {
  const [debouncedValue, setDebouncedValue] = useState<[T, U]>([first, second]);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedValue([first, second]),
      delay || 500,
    );

    return () => {
      clearTimeout(timer);
    };
  }, [first, second, delay]);

  return debouncedValue;
}

export default useDebouncePair;
