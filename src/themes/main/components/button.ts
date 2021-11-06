import { mode } from '@chakra-ui/theme-tools';

export default {
  baseStyle: {},
  sizes: {},
  variants: {
    gradient: (props) => ({
      bgGradient: mode(
        'linear(to-r, primary, gray.50)',
        'linear(to-r, primary, gray.800)',
      )(props),
    }),
  },
  defaultProps: {
    variant: 'outline',
  },
};
