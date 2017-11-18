import React, { Component } from 'react';
import { Button } from 'reactbulma';
import SocMedAccountForm from '../organism/SocMedAccountForm';

class AddAccount extends Component {
  render() {
    return (
      <div>
        <div class="columns is-mobile">
          <div class="column is-4 is-offset-4">
            <SocMedAccountForm buttonName="Save" buttonIcon="fa-pencil" title="Edit Account"/>
          </div>
        </div>
      </div>
    )
  }
}

export default AddAccount;
