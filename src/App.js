import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Main from './components/main';
import Edit from './components/edit'
import logo from './logo.svg';
import store from './store/store'
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Password Manager</h1>
        </header>
        <Router>
        <div>
        <Route exact path="/" component={Main}/>
        <Route path="/:id/edit" component={Edit}/>
        </div>
        </Router>
      </div>
      </Provider>
    );
  }
}

export default App;
