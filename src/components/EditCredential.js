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
      createdAt: '',
      updatedAt: '',
      redirect: false
    }
  }

  updateUrl(e) {
    this.setState({
      url: e.target.value,
      username: this.state.username,
      password: this.state.password,
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt,
      redirect: false
    })
  }

  updateUsername(e) {
    this.setState({
      url: this.state.url,
      username: e.target.value,
      password: this.state.password,
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt,
      redirect: false
    })
  }

  updatePassword(e) {
    this.setState({
      url: this.state.url,
      username: this.state.username,
      password: e.target.value,
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt,
      redirect: false
    })
  }

  editCredential() {
    const url = this.state.url;
    const username = this.state.username;
    const password = this.state.password;
    const createdAt = this.state.createdAt;
    const updatedAt = new Date();

    const credential = {url, username, password, createdAt, updatedAt};

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

  componentDidMount() {
    if (!this.state.loaded && this.props.credentials.length > 0) {
      const credential = this.props.credentials.find(credential => Number(credential.id) === Number(this.props.id));

      this.setState({
        loaded: true,
        url: credential.url,
        username: credential.username,
        password: credential.password,
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
        createdAt: credential.createdAt,
        updatedAt: credential.updatedAt,
        redirect: false
      });
    }
  }

  render() {
    if (this.state.redirect) return <Redirect to='/' />

    return (
      <div id='edit-credentials'>
        URL:<br/>
        <input type='text' value={ this.state.url } onChange={ e => this.updateUrl(e) }/><br/>
        Username:<br/>
        <input type='text'value={ this.state.username } onChange={ e => this.updateUsername(e) }/><br/>
        Password:<br/>
        <input type='text' value={ this.state.password } onChange={ e => this.updatePassword(e) }/><br/>
        <button onClick={ this.editCredential.bind(this) }>Edit Credential</button>
      </div>
    )
  }
}

const EditCredentialConnected = connect(mapStateToProps, mapDispatchToProps)(EditCredential);

export default EditCredentialConnected;