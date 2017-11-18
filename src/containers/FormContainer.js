import React, { Component } from 'react'
import {Field, reduxForm} from 'redux-form'
import owasp from 'owasp-password-strength-test'
import { connect } from 'react-redux'

import FieldComponent from '../components/FieldComponent'


class FormContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
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

  render() {
    return (
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <h3 className="text-center">Password Manager</h3>
          <form>
            <Field
              name="url"
              label="URL"
              component="input"
              type="text"
              component={FieldComponent}
              placeholder="https://example.com"
            />
            <Field
              name="username"
              label="Username"
              component="input"
              type="text"
              component={FieldComponent}
              placeholder="johdoe"
            />
            <Field
              name="password"
              label="Password"
              component="input"
              type="password"
              component={FieldComponent}
              validate={this.passwordStrength}
            />
            <button className="btn btn-primary" type="button">Save</button>&nbsp;
            <button className="btn btn-secondary" type="reset" onClick={this.props.reset}>Reset</button>
          </form>
        </div>
        <div className="col-md-4"></div>
      </div>
    );
  }

}

const mapStateToProps = () => {

}

FormContainer = reduxForm({
  form: 'password_manager'
})
(FormContainer)

export default (FormContainer)
