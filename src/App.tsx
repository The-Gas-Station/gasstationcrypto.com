import { ChakraProvider } from '@chakra-ui/react';
import Router from './router';
import theme from './themes/main';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  );
};

export default App;
