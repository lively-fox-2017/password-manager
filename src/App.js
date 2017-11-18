import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import dotenv from 'dotenv'
import { Provider } from 'react-redux'
import logo from './logo.svg'
import './App.css'

import store from './store'
import MainLayouts from './layouts/MainLayout'

dotenv.config()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <MainLayouts></MainLayouts>
        </Router>
      </Provider>
    );
  }
}

export default App
