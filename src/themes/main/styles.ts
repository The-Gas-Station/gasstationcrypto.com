import { mode } from '@chakra-ui/theme-tools';

export default {
  global: (props) => ({
    body: {
      color: mode('gray.900', '#C4C4C4')(props),
      bgColor: mode('gray.50', '#151824')(props),
    },
    button: {
      _focus: {
        outline: 'none',
      },
    },
    a: {
      _hover: {},
    },
  }),
};
