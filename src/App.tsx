import { ColorModeScript } from '@chakra-ui/react';
import Router from './router';
import theme from './themes/main';
import { useDarkMode } from './library/hooks/useDarkMode';

export const App = () => {
  const { isDarkMode } = useDarkMode(theme.config.initialColorMode == 'dark');

  return (
    <>
      <ColorModeScript initialColorMode={isDarkMode ? 'dark' : 'light'} />
      <Router />
    </>
  );
};

export default App;
