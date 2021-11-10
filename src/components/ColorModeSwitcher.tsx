import { useEffect } from 'react';

import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

import { useDarkMode } from '../library/hooks/useDarkMode';

export const ColorModeSwitcher = () => {
  const { isDarkMode, toggle } = useDarkMode(true);

  useEffect(() => {
    const html = document.querySelector('html');
    if (html) {
      html.dataset.theme = `theme-${isDarkMode ? 'dark' : 'light'}`;
    }
  }, [isDarkMode]);

  return (
    <MDBBtn tag="a" onClick={toggle} color="none" className="mode-switcher">
      <MDBIcon far icon="sun" className={isDarkMode ? '' : 'active'} /> /{' '}
      <MDBIcon far icon="moon" className={isDarkMode ? 'active' : ''} />
    </MDBBtn>
  );
};
