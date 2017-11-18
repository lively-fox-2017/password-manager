import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Control, SubTitle } from 'reactbulma';
import FormInput from '../molecules/FormInput';

class SocMedAccountForm extends Component {
  render() {
    return (
      <Control hasIconsLeft>
        <SubTitle is="2">{this.props.title}</SubTitle>
        <FormInput label="Username" placeholder="Username" fa="fa-user-circle"/>
        <FormInput label="Password" placeholder="Password" fa="fa-unlock-alt"/>
        <FormInput label="URL" placeholder="URL" fa="fa-globe"/>
        <Button primary><i className={`fa ${this.props.buttonIcon}`}>{this.props.buttonName}</i></Button>
        <Link to="/"><Button danger inverted><i className={'fa fa-times'}>Cancle</i></Button></Link>
      </Control>
    )
  }
}

export default SocMedAccountForm;
