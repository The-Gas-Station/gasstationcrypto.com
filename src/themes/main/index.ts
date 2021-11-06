import { extendTheme } from '@chakra-ui/react';
import Button from './components/button';
import colors from './foundations/colors';
import styles from './styles';

const overrides = {
  colors,
  components: { Button },
  styles,
  config: {
    initialColorMode: 'system',
    useSystemColorMode: false,
  },
};

export default extendTheme(overrides);
