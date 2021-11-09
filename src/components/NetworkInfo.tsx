import { Box } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { ChainId, CHAIN_NAMES } from '../library/constants/chains';
import { useBlockNumber } from '../library/providers/BlockNumberProvider';
import { getExplorerCountdownLink } from '../library/helpers/chains';
import useGasPrice from '../library/hooks/useGasPrice';
import { ethers } from 'ethers';
import useCoingeckoPrice from '../library/hooks/useCoingeckoPrice';
import { CHAIN_INFO } from '../configs';
import useEtherBalance from '../library/hooks/useEtherBalance';
import { useTokenBalance } from '../library/hooks/useTokenBalance';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';
import numeral from 'numeral';

interface NetworkInfoProps {
  chainId: ChainId;
}

export const NetworkInfo = ({ chainId }: NetworkInfoProps) => {
  try {
    const chainData = CHAIN_INFO[chainId];

    const { currentAccount } = useWeb3ConnectionsContext();

    const blockNumber = useBlockNumber(chainId);
    const gasPrice = useGasPrice(chainId);
    const etherPrice = useCoingeckoPrice(chainData.etherCoingeckoId);
    const etherBalance = useEtherBalance(chainId, currentAccount);

    const gasBalance = useTokenBalance(
      chainId,
      chainData.gasTokenAddress,
      currentAccount,
    );

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
          ? numeral(
              ethers.utils.formatUnits(gasPrice, ethers.BigNumber.from(9)),
            ).format('0.00')
          : 'Unknown'}
        <br />
        Ether Price: {numeral(etherPrice).format('$0,0.00')}
        <br />
        Ether Balance:{' '}
        {etherBalance
          ? numeral(ethers.utils.formatEther(etherBalance)).format('0,0.00')
          : ''}
        <br />
        GAS Price: {numeral(etherPrice).format('$0,0.00')}
        <br />
        GAS Balance:{' '}
        {gasBalance
          ? numeral(ethers.utils.formatEther(gasBalance)).format('0,0.00')
          : ''}
      </Box>
    );
  } catch (e) {}

  return <></>;
};

export default NetworkInfo;
