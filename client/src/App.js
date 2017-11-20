import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-theme.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Navbar from './components/Navbar'
import UserList from './components/UserList'
import UserAdd from './components/UserAdd'
import UserEdit from './components/UserEdit'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <div className="container">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Password Manager</h1>
              </header>
              <Navbar/>
              {/* <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p> */}
            <Route exact path="/" component={UserList}/>
            <Route exact path="/users/add" component={UserAdd}/>
            <Route exact path="/users/edit/:id" component={UserEdit}/>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
