import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './share/store';
import './index.css';
import App from './components/app/App';

const root = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(root);

reactRoot.render(
    <Provider store={store}>
      <App />
    </Provider>
);