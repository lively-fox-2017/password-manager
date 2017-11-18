import React, { Component } from 'react';
import FormInput from '../molecules/FormInput';

class SocMedAccountForm extends Component {
  render() {
    return (
      <div>
        <FormInput label="Username" placeholder="Username" fa="fa-user-circle"/>
        <FormInput label="Password" placeholder="Password" fa="fa-key"/>
        <FormInput label="URL" placeholder="URL" fa="fa-universal-access"/>
      </div>
    )
  }
}

export default SocMedAccountForm;
