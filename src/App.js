import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import Header from './organism/Header';
import Home from './Pages/Home';
import AddAccount from './Templates/AddAccount';
import EditAccount from './Templates/EditAccount';
import store from './redux/store';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
        <div className="App">

          <Header/>
          <Route exact path="/" component={ Home } />
          <Route exact path="/add-account" component={ AddAccount }/>
          <Route exact path="/edit-account/:id" component={ EditAccount }/>

        </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
