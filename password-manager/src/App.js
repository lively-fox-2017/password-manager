import React, { Component } from 'react';
import axios from 'axios'
import { Provider, connect } from 'react-redux'
import { BrowserRouter, Route, Link } from 'react-router-dom'

// import logo from './logo.svg';
// import './App.css';
import store from './store'

import Register from './components/Register'
import List from './components/List'


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a className="navbar-brand" href="#">WebSiteName</a>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to="/"> Register </Link></li>
                  <li><Link to="/list"> List </Link></li>
                </ul>
              </div>
            </nav>
            <Route exact path="/" component={Register} />
            <Route path="/list" component={List} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App
