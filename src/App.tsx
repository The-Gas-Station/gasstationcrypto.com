import './scss/dark.scss';
import './scss/light.scss';

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useWeb3ConnectionsContext } from './library/providers/Web3ConnectionsProvider';

import { CHAIN_NAMES } from './library/constants/chains';

import MainLayout from './layouts/MainLayout';

import HomePage from './pages/HomePage';
import RewardsHubPage from './pages/RewardsHubPage';
import NFPPage from './pages/NFPPage';
import UtilityPage from './pages/utility';

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
          <Route path="utility" element={<UtilityPage />} />
          <Route path="/:chain">
            <Route path="hub" element={<RewardsHubPage />} />
            <Route path="nfp" element={<NFPPage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
