import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import ComponentPasswordForm from './ComponentPasswordForm'
import ComponentPasswordSearch from './ComponentPasswordSearch'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>

        </header>
        <Route exact path="/" component={ComponentPasswordForm}/>
        <Route exact path="/search" component={ComponentPasswordSearch}/>

      </div>
      </Router>
      </Provider>

    );
  }
}

export default App;
