import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';

import { CHAIN_NAMES, ChainId } from '../library/constants/chains';

import RewardsHubChainPage from './RewardsHubChainPage';

export const RewardsHubPage = () => {
  const navigate = useNavigate();
  const { chain }: { chain: string | undefined } = useParams();

  const search = Object.entries(CHAIN_NAMES).find(
    (data) => data[1].toLowerCase() == chain?.toLowerCase(),
  );
  const chainId: ChainId | undefined =
    search && search[0] ? parseInt(search[0]) : undefined;

  const { readOnlyChainIds } = useConfig();
  const { currentChainId } = useWeb3ConnectionsContext();

  if (!chainId) {
    navigate(`/${CHAIN_NAMES[currentChainId]}/hub`);
  }

  return (
    <RewardsHubChainPage key={chainId} chainId={chainId ?? currentChainId} />
  );
};

export default RewardsHubPage;
