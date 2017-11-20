import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { editCredential } from './../actions/CredentialActions';

const mapStateToProps = (state, ownProps) => ({
  credentials: state.CredentialReducer.credentials,
  id: ownProps.match.params.id
});

const mapDispatchToProps = (dispatch) => ({
  editCredential: (id, credential) => dispatch(editCredential(id, credential))
});

class EditCredential extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
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
      createdAt: '',
      updatedAt: '',
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

  updateUrl(e) {
    this.setState({
      url: e.target.value,
    });
  }

  updateUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  updatePassword(e) {
    const password = e.target.value;
    const passwordValidation = this.checkPassword(password);

    this.setState({
      password,
      passwordValidation
    });
  }

  editCredential() {
    const url = this.state.url;
    const username = this.state.username;
    const password = this.state.password;
    const createdAt = this.state.createdAt;
    const updatedAt = new Date();

    const credential = {url, username, password, createdAt, updatedAt};

    if (this.isPasswordValidated()) {
      this.props.editCredential(this.props.id, credential);

      this.setState({
        loaded: false,
        url: '',
        username: '',
        password: '',
        createdAt: '',
        updatedAt: '',
        redirect: true
      });
    }
  }

  componentDidMount() {
    if (!this.state.loaded && this.props.credentials.length > 0) {
      const credential = this.props.credentials.find(credential => Number(credential.id) === Number(this.props.id));

      this.setState({
        loaded: true,
        url: credential.url,
        username: credential.username,
        password: credential.password,
        passwordValidation: this.checkPassword(credential.password),
        createdAt: credential.createdAt,
        updatedAt: credential.updatedAt,
        redirect: false
      });
    }   
  }

  componentWillReceiveProps(nextprops) {
    if (!this.state.loaded && nextprops.credentials.length > 0) {
      const credential = nextprops.credentials.find(credential => Number(credential.id) === Number(this.props.id));

      this.setState({
        loaded: true,
        url: credential.url,
        username: credential.username,
        password: credential.password,
        passwordValidation: this.checkPassword(credential.password),
        createdAt: credential.createdAt,
        updatedAt: credential.updatedAt,
        redirect: false
      });
    }
  }

  render() {
    if (this.state.redirect) return <Redirect to='/' />

    return (
      <div>
        <div id='edit-credentials'>
          URL:<br/>
          <input type='text' value={ this.state.url } onChange={ e => this.updateUrl(e) }/><br/>
          Username:<br/>
          <input type='text'value={ this.state.username } onChange={ e => this.updateUsername(e) }/><br/>
          Password:<br/>
          <input type='text' value={ this.state.password } onChange={ e => this.updatePassword(e) }/><br/>
          <button onClick={ this.editCredential.bind(this) }>Edit Credential</button>
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
    )
  }
}

const EditCredentialConnected = connect(mapStateToProps, mapDispatchToProps)(EditCredential);

export default EditCredentialConnected;