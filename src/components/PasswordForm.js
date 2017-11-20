import React from 'react'
import owasp from 'owasp-password-strength-test'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import {Card, CardHeader, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField';

import { create, getById, update } from '../actions/accountsAction'

owasp.config({
  allowPassphrases       : true,
  maxLength              : 128,
  minLength              : 5,
  minPhraseLength        : 20,
  minOptionalTestsToPass : 6,
});

class PasswordForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isEdit: props.isEdit,
      errorText: 'This field is required',
      account: props.account,
      id:props.id
    }
  }
  checkPassword() {
    var strength = owasp.test(this.refs.passwordField.getValue())
    this.setState({
      errorText: strength.errors[0]
    })
  }
  doSubmit (values) {
    var datum = {
      url: values.url,
      password: values.password,
      username: values.username
    }
    this.props.create(datum)
    this.props.reset()
  }
  doUpdate (values, id) {
    var datum = {
      id: id,
      url: values.url,
      password: values.password,
      username: values.username
    }
    this.props.update(datum)
    this.props.getById(-1)
    this.props.reset()
  }
  submitForm(values) {
    if(this.state.isEdit) {
      this.doUpdate(values, this.state.id)
    } else {
      this.doSubmit(values)
    }
  }
  componentWillMount () {
    if (this.state.isEdit) {
      this.props.getById(this.state.id)
    }
  }
  renderTextField ({input,label,meta: { touched, error },...custom}) {
    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    )
  }
  renderPasswordField ({input,label,meta: { touched, error },...custom}) {
    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    )
  }
  render () {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form>
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
                <Field
                  name="url"
                  component={this.renderTextField}
                  label="URL"
                />
                <br/>
                <Field
                  name="username"
                  component={this.renderTextField}
                  label="Username"
                /><br/>
                {/* <TextField
                  ref='passwordField'
                  floatingLabelText="Password"
                  errorText={this.state.errorText}
                  onChange={() => this.checkPassword()}
                /><br/> */}
                <Field
                  name="password"
                  component={this.renderPasswordField}
                  label="Password"
                /><br/>
                <br/>
                <br/>
                <button type="button" onClick={handleSubmit((values) => this.submitForm(values))} disabled={pristine || submitting}>
                  Submit
                </button>
                <button ref="buttonReset" type="button" disabled={pristine || submitting} onClick={reset}>
                  Clear Values
                </button>
              </CardText>
            </Card>
          </MuiThemeProvider>
        </div>
      </form>
    )
  }
}
function validate (values) {
  const errors = {}
  const requiredFields = [
    'url',
    'username',
    'password'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.password && owasp.test(values.password).errors.length > 0
  ) {
    errors.password = owasp.test(values.password).errors[0]
  }
  return errors
}

const mapDispatchToProps = (dispatch) => {
  return {
    create: (data) => dispatch(create(data)),
    getById: (id) => dispatch(getById(id)),
    update: (data) => dispatch(update(data))
  }
}

const mapStateToProps = (state) => {
  return {
    initialValues: state.accountsReducer.account
  }
}
var redux_form = reduxForm({form: 'passwordForm', validate, enableReinitialize : true})(PasswordForm)
var component = connect(mapStateToProps, mapDispatchToProps)(redux_form)

export default component
