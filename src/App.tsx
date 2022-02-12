import './scss/dark.scss';
import './scss/light.scss';

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useWeb3ConnectionsContext } from './library/providers/Web3ConnectionsProvider';

import { CHAIN_NAMES } from './library/constants/chains';

import MainLayout from './layouts/MainLayout';

import HomePage from './pages/HomePage';
import RewardsHubPage from './pages/RewardsHubPage';
import NFPPage from './pages/NFPPage';
import UtilitiesPage from './pages/UtilitiesPage';
import BridgePage from './pages/BridgePage';
import SharesPage from './pages/SharesPage';


export const App = () => {
  const { currentChainId } = useWeb3ConnectionsContext();

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/hub"
            element={<Navigate to={`/${CHAIN_NAMES[currentChainId]}/hub`} />}
          />
          <Route
            path="/nfp"
            element={<Navigate to={`/${CHAIN_NAMES[currentChainId]}/nfp`} />}
          />
          <Route
            path="/utilities"
            element={
              <Navigate to={`/${CHAIN_NAMES[currentChainId]}/utilities`} />
            }
          />
          <Route
            path="/bridge"
            element={<Navigate to={`/${CHAIN_NAMES[currentChainId]}/bridge`} />}
          />
          <Route
            path="/shares"
            element={<Navigate to={`/${CHAIN_NAMES[currentChainId]}/shares`} />}
          />
          <Route path="/:chain">
            <Route path="hub" element={<RewardsHubPage />} />
            <Route path="bridge" element={<BridgePage />} />
            <Route path="nfp" element={<NFPPage />} />
            <Route path="utilities" element={<UtilitiesPage />} />
            <Route path="shares" element={<SharesPage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
