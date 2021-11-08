import { Box } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { ChainId, CHAIN_NAMES } from '../library/constants/chains';
import { useBlockNumber } from '../library/providers/BlockNumberProvider';
import { getExplorerCountdownLink } from '../library/helpers/chains';
import useGasPrice from '../library/hooks/useGasPrice';
import { ethers } from 'ethers';

interface NetworkInfoProps {
  chainId: ChainId;
}

export const NetworkInfo = ({ chainId }: NetworkInfoProps) => {
  try {
    const blockNumber = useBlockNumber(chainId);
    const gasPrice = useGasPrice(chainId);

    return (
      <Box
        h="md"
        bgColor={useColorModeValue('gray.500', 'gray.300')}
        gridColumn="span 1 / span 1"
        borderRadius="10"
      >
        Network: {CHAIN_NAMES[chainId]}
        <br />
        BlockNumber:{' '}
        {blockNumber ? (
          <a
            href={getExplorerCountdownLink(chainId, blockNumber)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {blockNumber}
          </a>
        ) : (
          ''
        )}
        <br />
        Gas Price:{' '}
        {gasPrice
          ? ethers.utils.formatUnits(gasPrice, ethers.BigNumber.from(9))
          : 'Unknown'}
      </Box>
    );
  } catch (e) {}

  return <></>;
};

export default NetworkInfo;
