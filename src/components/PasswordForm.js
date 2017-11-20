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
      passwordValidation: {
        haveUppercase: false,
        haveLowercase: false,
        haveSpecialChar: false,
        haveNumber: false,
        lengthBiggerThanFive: false
      },
      redirect: false
    }
  }

  checkPassword(password) {
    let passwordValidation = {
        haveUppercase: false,
        haveLowercase: false,
        haveSpecialChar: false,
        haveNumber: false,
        lengthBiggerThanFive: false
      };

    if (/[A-Z]/.test(password)) passwordValidation.haveUppercase = true;
    if (/[a-z]/.test(password)) passwordValidation.haveLowercase = true;
    if (/[!@#$%^&*()]/.test(password)) passwordValidation.haveSpecialChar = true;
    if (/\d/.test(password)) passwordValidation.haveNumber = true;
    if (password.length > 5) passwordValidation.lengthBiggerThanFive = true;

    return passwordValidation;
  }

  isPasswordValidated() {
    const validated = this.state.passwordValidation;
    const isPasswordValidated = validated.haveUppercase && 
                                validated.haveLowercase && 
                                validated.haveSpecialChar && 
                                validated.haveNumber && 
                                validated.lengthBiggerThanFive;

    return isPasswordValidated;
  }

  saveCredential() {
    const url = this.state.url;
    const username = this.state.username;
    const password = this.state.password;
    const createdAt = new Date();
    const updatedAt = new Date();

    const credential = {url, username, password, createdAt, updatedAt};

    if (this.isPasswordValidated()) {
      this.props.saveCredential(credential);
      this.setState({
        url: '',
        username: '',
        password: '',
        passwordValidation: {
          haveUppercase: false,
          haveLowercase: false,
          haveSpecialChar: false,
          haveNumber: false,
          lengthBiggerThanFive: false
        },
        redirect: true
      })
    }
  }

  updateUrl(e) {
    this.setState({
      url: e.target.value
    })
  }

  updateUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  updatePassword(e) {
    const password = e.target.value;
    const passwordValidation = this.checkPassword(password);

    this.setState({
      password,
      passwordValidation
    })
  }

  render() {
    if (this.state.redirect) return <Redirect to='/' />
    return (
      <div>
        <div id='password-form'>
          URL:<br/>
          <input type='text' value={ this.state.url } onChange={ e => this.updateUrl(e) }/><br/>
          Username:<br/>
          <input type='text'value={ this.state.username } onChange={ e => this.updateUsername(e) }/><br/>
          Password:<br/>
          <input type='password' value={ this.state.password } onChange={ e => this.updatePassword(e) }/><br/>
          <button onClick={ this.saveCredential.bind(this) }>SAVE</button>
        </div>
        <div className="password-validation">
          <p>
            <span>[{this.state.passwordValidation.haveUppercase ? 'v': ' '}]</span> 
            password must have minimum one uppercase letter
          </p>
          <p>
            <span>[{this.state.passwordValidation.haveLowercase ? 'v' : ' '}]</span> 
            password must have minimum one lowercase letter
          </p>
          <p>
            <span>[{this.state.passwordValidation.haveSpecialChar ? 'v' : ' '}]</span> 
            password must have minimum one special character
          </p>
          <p>
            <span>[{this.state.passwordValidation.haveNumber ? 'v' : ' '}]</span> 
            password must have minimum one number
          </p>
          <p>
            <span>[{this.state.passwordValidation.lengthBiggerThanFive ? 'v' : ' '}]</span> 
            password must have minimum 6 characters
          </p>
        </div>
      </div>
    );
  }
}

const PasswordFormConnected = connect(null, mapDispatchToProps)(PasswordForm);

export default PasswordFormConnected;