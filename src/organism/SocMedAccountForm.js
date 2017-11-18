import React, { Component } from 'react';
import { Button, Control } from 'reactbulma';
import FormInput from '../molecules/FormInput';

class SocMedAccountForm extends Component {
  render() {
    return (
      <Control hasIconsLeft>
        <FormInput label="Username" placeholder="Username" fa="fa-user-circle"/>
        <FormInput label="Password" placeholder="Password" fa="fa-key"/>
        <FormInput label="URL" placeholder="URL" fa="fa-universal-access"/>
        <Button danger>{this.props.buttonName}</Button>
      </Control>
    )
  }
}

export default SocMedAccountForm;
