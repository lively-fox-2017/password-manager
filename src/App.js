import React, { Component } from 'react';
import './App.css';
import Header from './organism/Header';
import Home from './Templates/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Home/>
      </div>
    );
  }
}

export default App;
