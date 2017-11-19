import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import dotenv from 'dotenv'
import { Provider } from 'react-redux'

import configureStore from '../store'

import Routes from '../routes/Routes'

dotenv.config()

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Routes />
        </Router>
      </Provider>
    );
  }
}

export default App
