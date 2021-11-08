import { Box } from '@chakra-ui/layout';
import { Main } from '../layouts/main';
import { useConfig } from '../library/providers/ConfigProvider';

import NetworkInfo from '../components/NetworkInfo';

export const Test = () => {
  const { readOnlyChainIds } = useConfig();

  return (
    <Main>
      <>
        <Box></Box>
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
          {readOnlyChainIds?.map((chainId) => (
            <NetworkInfo chainId={chainId} key={chainId} />
          ))}
        </Box>
      </>
    </Main>
  );
};
