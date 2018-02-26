import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './redux/store';
import registerServiceWorker from './registerServiceWorker';
import { getPodcasts } from './redux/actions/podcasts';

const store = configureStore({});
getPodcasts(store.dispatch);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
