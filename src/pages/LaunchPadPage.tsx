import { useParams, useNavigate } from 'react-router-dom';

import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';

import { CHAIN_NAMES, ChainId } from '../library/constants/chains';

import LaunchPadChainPage from './LaunchPadChainPage';

export const LaunchPadPage = () => {
  const navigate = useNavigate();
  const { chain } = useParams<{ chain: string | undefined }>();

  const search = Object.entries(CHAIN_NAMES).find(
    (data) => data[1].toLowerCase() == chain?.toLowerCase(),
  );
  const chainId: ChainId | undefined =
    search && search[0] ? parseInt(search[0]) : undefined;

  const { currentChainId } = useWeb3ConnectionsContext();

  if (!chainId) {
    navigate(`/${CHAIN_NAMES[currentChainId]}/hub`);
    return <></>;
  }

  return <LaunchPadChainPage key={chainId} chainId={chainId} />;
};

export default LaunchPadPage;
