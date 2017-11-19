import React, { Component } from 'react'
import {Field, reduxForm} from 'redux-form'
import owasp from 'owasp-password-strength-test'
import { connect } from 'react-redux'

import FieldComponent from '../components/FieldComponent'
import { fetchAccounts } from '../actions/AccountActions'

class FormContainer extends Component {

  constructor (props) {
    super(props)

    this.state = {

    }
  }

  componentWillMount () {
    this.props.fetchAccounts()
  }

  passwordStrength = value => {
    if (value) {
      const result = owasp.test(value)
      if (result.strong) {
        return undefined
      } else {
        return result.errors
      }
    }
  }

  submitHandler = data => {
    console.log(data)
  }

  required = value => value ? undefined : ['This field is required']

  render() {
    return (
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <form>
            <Field
              name="url"
              label="URL"
              component="input"
              type="text"
              component={FieldComponent}
              validate={this.required}
              placeholder="https://example.com"
            />
            <Field
              name="username"
              label="Username"
              component="input"
              type="text"
              component={FieldComponent}
              validate={this.required}
              placeholder="johdoe"
            />
            <Field
              name="password"
              label="Password"
              component="input"
              type="password"
              component={FieldComponent}
              validate={[this.passwordStrength, this.required]}
            />
            <button className="btn btn-primary" type="button" onClick={this.props.handleSubmit(data => this.submitHandler(data))}>Save</button>&nbsp;
            <button className="btn btn-secondary" type="reset" onClick={this.props.reset}>Reset</button>
          </form>
        </div>
        <div className="col-md-4"></div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    accounts: state.accountReducer.accounts
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAccounts: () => dispatch(fetchAccounts())
  }
}

FormContainer = reduxForm({
  form: 'password_manager'
})(FormContainer)

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer)
