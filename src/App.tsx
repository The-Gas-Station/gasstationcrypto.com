import './scss/dark.scss';
import './scss/light.scss';

import { HashRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import HomePage from './pages/HomePage';
import RewardsHubPage from './pages/RewardsHubPage';
import NFPPage from './pages/NFPPage';
import TestPage from './pages/test';

export const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/hub" element={<RewardsHubPage />}>
            <Route path=":chain" element={<RewardsHubPage />} />
          </Route>
          <Route path="/nfp" element={<NFPPage />} />
          <Route path="/test" element={<TestPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
