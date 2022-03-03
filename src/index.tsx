import * as React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/react-hooks';

import DAppProvider from './library/providers/DAppProvider';
import { AppConfig } from './configs';

const App = React.lazy(() => import('./App'));

const client = new ApolloClient({
  uri: 'https://2zq24407b2.execute-api.us-west-2.amazonaws.com/graphql',
  credentials: 'include',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <DAppProvider config={AppConfig}>
        <React.Suspense fallback={<>...</>}>
          <App />
        </React.Suspense>
      </DAppProvider>
    </ApolloProvider>
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
