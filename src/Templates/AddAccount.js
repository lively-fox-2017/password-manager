import React, { Component } from 'react';
import { Button } from 'reactbulma';
import SocMedAccountForm from '../organism/SocMedAccountForm';

class AddAccount extends Component {
  render() {
    return (
      <div>
        <div class="columns is-mobile">
          <div class="column is-4 is-offset-4">
            <SocMedAccountForm buttonName="Add Account" buttonIcon="fa-plus" title="Add Account"/>
          </div>
        </div>
      </div>
    )
  }
}

export default AddAccount;
