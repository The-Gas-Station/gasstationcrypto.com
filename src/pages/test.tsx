import { Box } from '@chakra-ui/layout';
import { Main } from '../layouts/main';
import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';

import NetworkInfo from '../components/NetworkInfo';
import { CHAIN_NAMES } from '../library/constants/chains';

export const Test = () => {
  const { readOnlyChainIds } = useConfig();
  const { currentAccount, currentChainId } = useWeb3ConnectionsContext();

  return (
    <Main>
      <>
        <Box display="block">
          Chain: {CHAIN_NAMES[currentChainId]} Address: {currentAccount}
        </Box>
        <Box display="block">
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
        </Box>
      </>
    </Main>
  );
};
