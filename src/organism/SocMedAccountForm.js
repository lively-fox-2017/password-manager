import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Control, SubTitle } from 'reactbulma';
import FormInput from '../molecules/FormInput';
import socMedAccountFormActions from '../redux/actions/SocMedAccountForm';

class SocMedAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      url: '',
    }
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler() {
    this.props.clickHandler(this.props.username, this.props.password, this.props.url)
  }

  render() {
    return (
      <Control hasIconsLeft>
        <SubTitle is="2">{this.props.title}</SubTitle>
        <FormInput changeHandler={this.props.setUsername} val={this.props.username} label="Username" placeholder="Username" fa="fa-user-circle"/>
        <FormInput changeHandler={this.props.setPassword} val={this.props.password} label="Password" placeholder="Password" fa="fa-unlock-alt"/>
        <FormInput changeHandler={this.props.setUrl} val={this.props.url} label="URL" placeholder="URL" fa="fa-globe"/>
        <Button onClick={this.clickHandler} primary><i className={`fa ${this.props.buttonIcon}`}>{this.props.buttonName}</i></Button>
        <Link to="/"><Button danger inverted><i className={'fa fa-times'}>Cancel</i></Button></Link>
      </Control>
    )
  }
}

function mapStateToProps(store) {
  return {
    socMedAccountForm: store.socMedAccountForm,
    username: store.socMedAccountForm.username,
    password: store.socMedAccountForm.password,
    url: store.socMedAccountForm.url,
  }
}

function mapActionsToProps(dispatch) {
  return {
    setUsername: (value) => {
      return dispatch(socMedAccountFormActions.usernameValue(value));
    },
    setPassword: (value) => {
      return dispatch(socMedAccountFormActions.passwordValue(value));
    },
    setUrl: (value) =>  {
      return dispatch(socMedAccountFormActions.urlValue(value));
    },
  }
}

export default connect(mapStateToProps, mapActionsToProps)(SocMedAccountForm)

// export default SocMedAccountForm;
