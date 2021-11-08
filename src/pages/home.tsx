import { Box } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Main } from '../layouts/main';
import { Button } from '@chakra-ui/button';

export const Home = () => {
  return (
    <Main>
      <>
        <Box
          display="grid"
          gridTemplateColumns={{
            base: 'repeat(1, minmax(0, 1fr))',
            md: 'repeat(5, minmax(0, 1fr))',
          }}
          gridGap={{ base: 6, lg: 12 }}
          padding={{ base: 6, lg: 12 }}
          w="full"
          h="full"
        >
          <Box
            h="md"
            bgColor={useColorModeValue('gray.500', 'gray.300')}
            gridColumn="span 1 / span 1"
            borderRadius="10"
          />
          <Box
            h="md"
            bgColor={useColorModeValue('gray.500', 'gray.300')}
            gridColumn={{ base: 'span 1 / span 1', md: 'span 3 / span 3' }}
            borderRadius="10"
          />
          <Box
            h="md"
            bg={useColorModeValue('gray.500', 'gray.300')}
            gridColumn="span 1 / span 1"
            borderRadius="10"
          />
        </Box>
        <Button variant="gradient">Haay</Button>
      </>
    </Main>
  );
};
