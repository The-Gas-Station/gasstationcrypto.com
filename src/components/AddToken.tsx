import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';
import useEthers from '../library/hooks/useEthers';

const AddToken = () => {
  const { currentChainId: viewingChainId } = useWeb3ConnectionsContext();
  const { account, chainId: connectedChainId } = useEthers();

  console.log('viewing currentChainId', viewingChainId);
  console.log('connected', account, connectedChainId);
  const chainsMatch = viewingChainId === connectedChainId;

  const chainsMatchString = chainsMatch ? 'Same Chains' : 'Different Chains';
  if (chainsMatch) {
    return <h2>{chainsMatchString}</h2>;
  }
  return null;
};

export default AddToken;
