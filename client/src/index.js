import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase'
import store from './store/index'
import { Provider } from 'react-redux'
import { history } from './store'

var config = {
  apiKey: "AIzaSyCfUDFkgzFt_Nzq7hJjX_DQmQE5KuNXw3g",
    authDomain: "websocket-slide-ba8fd.firebaseapp.com",
    databaseURL: "https://websocket-slide-ba8fd.firebaseio.com",
    projectId: "websocket-slide-ba8fd",
    storageBucket: "websocket-slide-ba8fd.appspot.com",
    messagingSenderId: "258066709342"
}

firebase.initializeApp(config)

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
