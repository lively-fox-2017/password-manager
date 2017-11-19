import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux';

import store from './store'

import Main from './components/Main'
import DeleteAccounts from './components/DeleteAccounts'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Route path="/" component={ Main }/>
              <Route exact path="/delete/:id" component= { DeleteAccounts }/>
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
