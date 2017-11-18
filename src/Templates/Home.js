import React, { Component } from 'react';
import { Collumns, Collumn } from 'reactbulma';
import AccountList from '../organism/AccountList';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <AccountList/>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
