import * as React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

import App from './App';

import DAppProvider from './library/providers/DAppProvider';
import { AppConfig } from './configs';

import HomePage from './pages/HomePage';
import RewardsHubPage from './pages/RewardsHubPage';
import NFPPage from './pages/NFPPage';
import TestPage from './pages/test';

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={AppConfig}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/hub" element={<RewardsHubPage />} />
            <Route path="/nfp" element={<NFPPage />} />
            <Route path="/test" element={<TestPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
