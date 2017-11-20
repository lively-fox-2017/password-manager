import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

//others
import './App.css';
import logo from './logo.svg';

//components
import Home from './components/Home'
import Search from './components/Search'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Password Manager</h1>
        </header>
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <Router>
          <div>
            <Link to="/"  > Home</Link> |
            <Link to="/search" > Search Password</Link>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/edit" component={Home} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
