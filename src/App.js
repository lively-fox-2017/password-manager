import React, { Component } from 'react';
import { Provider } from 'react-redux'

import './App.css';

import RootContainer from './RootContainer'

import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <RootContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
