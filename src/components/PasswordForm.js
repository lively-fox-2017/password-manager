import React from 'react'
import owasp from 'owasp-password-strength-test'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { create, getById, update } from '../actions/accountsAction'

class PasswordForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isEdit: props.isEdit,
      errorText: 'This field is required',
      url: props.account.url
    }
    owasp.config({
      allowPassphrases       : true,
      maxLength              : 128,
      minLength              : 5,
      minPhraseLength        : 20,
      minOptionalTestsToPass : 4,
    });
  }
  checkPassword() {
    var strength = owasp.test(this.refs.passwordField.getValue())
    this.setState({
      errorText: strength.errors[0]
    })
  }
  resetField() {
    if(this.state.isEdit) {
      return <Redirect push to="/"/>
    }
    this.refs.passwordField.getInputNode().value = ''
    this.refs.urlField.getInputNode().value = ''
    this.refs.usernameField.getInputNode().value = ''
  }
  submitForm() {
    if(this.state.isEdit) {
      var datum = {
        url: this.refs.urlField.getValue(),
        password: this.refs.passwordField.getValue(),
        username: this.refs.usernameField.getValue(),
        id: this.props.id
      }
      this.props.update(datum)
      this.resetField()
    } else {
      var datum = {
        url: this.refs.urlField.getValue(),
        password: this.refs.passwordField.getValue(),
        username: this.refs.usernameField.getValue()
      }
      this.props.create(datum)
      this.resetField()
    }
  }
  render () {
    return (
      <div>
        <br/>
        <br/>
        <MuiThemeProvider>
          <Card>
            <CardHeader
              title="Account Form"
              subtitle="Password Manager"
            />
            <CardText>
              <TextField
                ref='urlField'
                floatingLabelText="URL"
              /><br/>
              <TextField
                ref='usernameField'
                floatingLabelText="Username"
              /><br/>
              <TextField
                ref='passwordField'
                floatingLabelText="Password"
                errorText={this.state.errorText}
                onChange={() => this.checkPassword()}
              /><br/>
              <FlatButton label="Cancel" onClick={() => {this.resetField()}}/>
              <FlatButton label="Submit" onClick={() => {this.submitForm()}}/>
            </CardText>
          </Card>
        </MuiThemeProvider>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    create: (data) => dispatch(create(data)),
    update: (data) => dispatch(update(data))
  }
}

export default connect(null, mapDispatchToProps)(PasswordForm)
