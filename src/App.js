import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import UserReduce from './reducers/UserReduce'
import Header from './Header'
import Main from './Main'
const store = createStore(
  UserReduce,
  applyMiddleware(thunk)
)
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
        <Router>
          <div>
            <Header/>
            <div className="container">
              <Main/>
            </div>
          </div>
        </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
