import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import History from './route/History';

const { store, persistor } = configureStore();
ReactDOM.render(
  <React.StrictMode>
    <Router history={History}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
