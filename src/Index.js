import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import App from './App';
import store from './lib/store';
import { Provider } from 'react-redux';
import { addToList, updateBadge } from './lib/actionCreators'


store.dispatch(addToList())
store.dispatch(updateBadge())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);