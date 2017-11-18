import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import dotenv from 'dotenv'
import { Provider } from 'react-redux'

import { store } from './store'
import MainComponent from './components/MainComponent'
import FormContainer from './containers/FormContainer'

dotenv.config()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" render={({match}) => (
            <MainComponent>
              <FormContainer />
            </MainComponent>
          )} />
        </Router>
      </Provider>
    );
  }
}

export default App
