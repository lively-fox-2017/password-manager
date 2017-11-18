import React, { Component } from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';

import store from './store'
import Router from './Router';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

// Change this URL if you're using another port for json-server
window.$server = axios.create({
  baseURL: 'http://localhost:4000'
});

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router/>
      </Provider>
    );
  }
}

export default App;
