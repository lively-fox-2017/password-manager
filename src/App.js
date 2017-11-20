import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import store from './store';

import { getCredentials } from './actions/CredentialActions';

import Home from './components/Home';
import PasswordForm from './components/PasswordForm';
import EditCredential from './components/EditCredential';

class App extends Component {
  componentDidMount() {
    store.dispatch(getCredentials())
  }

  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div>
            <h1>Password Manager</h1>
            <nav>
              <Link to='/'>Home</Link>
              <br/>
              <Link to='/add'>Add</Link>
            </nav>
            <Route exact path='/' component={ Home } />
            <Route exact path='/add' component={ PasswordForm } />
            <Route path='/edit/:id' component={ EditCredential } />
            <Route/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
