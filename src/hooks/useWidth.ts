import { useEffect, useState } from 'react';

export const useWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth <= 768 && window.innerWidth > 425,
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    setIsTablet(width <= 768 && width > 425);
    setIsMobile(width <= 425);
  }, [width]);

  return { width, isTablet, isMobile };
};

export default useWidth;
