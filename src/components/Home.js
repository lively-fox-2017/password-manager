import React, { Component } from 'react';

import PasswordList from './PasswordList';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <h1>Password Manager</h1>
        <hr/>
        <PasswordList/>
      </div>
    );
  }
}

export default Home;
