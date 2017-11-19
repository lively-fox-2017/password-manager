import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { saveCredential } from './../actions/CredentialActions';

const mapDispatchToProps = (dispatch) => ({
  saveCredential: (credential) => dispatch(saveCredential(credential))
});

class PasswordForm extends React.Component {
  constructor() {
    super();

    this.state = {
      url: '',
      username: '',
      password: '',
      redirect: false
    }
  }

  saveCredential() {
    const url = this.state.url;
    const username = this.state.username;
    const password = this.state.password;
    const createdAt = new Date();
    const updatedAt = new Date();

    const credential = {url, username, password, createdAt, updatedAt};

    this.props.saveCredential(credential);
    this.setState({
      url: '',
      username: '',
      password: '',
      redirect: true
    })
  }

  updateUrl(e) {
    this.setState({
      url: e.target.value,
      username: this.state.username,
      password: this.state.password,
      redirect: false
    })
  }

  updateUsername(e) {
    this.setState({
      url: this.state.url,
      username: e.target.value,
      password: this.state.password,
      redirect: false
    })
  }

  updatePassword(e) {
    this.setState({
      url: this.state.url,
      username: this.state.username,
      password: e.target.value,
      redirect: false
    })
  }

  render() {
    if (this.state.redirect) return <Redirect to='/' />
    return (
      <div id='password-form'>
        URL:<br/>
        <input type='text' value={ this.state.url } onChange={ e => this.updateUrl(e) }/><br/>
        Username:<br/>
        <input type='text'value={ this.state.username } onChange={ e => this.updateUsername(e) }/><br/>
        Password:<br/>
        <input type='password' value={ this.state.password } onChange={ e => this.updatePassword(e) }/><br/>
        <button onClick={ this.saveCredential.bind(this) }>SAVE</button>
      </div>
    );
  }
}

const PasswordFormConnected = connect(null, mapDispatchToProps)(PasswordForm);

export default PasswordFormConnected;