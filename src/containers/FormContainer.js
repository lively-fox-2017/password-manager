import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import owasp from 'owasp-password-strength-test'
import {connect} from 'react-redux'

import FieldComponent from '../components/FieldComponent'
import {fetchAddAccount, fetchUpdateAccount, toggleSuccess, resetCurrentAccount} from '../actions/AccountActions'

class FormContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isShow: props.currentAccount ? true : false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!Object.is(nextProps.initialValues, this.props.initialValues)) {
      if (nextProps.initialValues) {
        this.setState({
          isShow: true
        })
      } else {
        this.setState({
          isShow: false
        })
      }
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

  required = value => value
    ? undefined
    : ['This field is required']

  submitHandler = data => {
    if (this.props.initialValues) {
      this.props.fetchUpdateAccount(data)
    } else {
      this.props.fetchAddAccount(data)
    }
  }

  resetHandler = () => {
    this.props.resetCurrentAccount()
    this.props.reset()
  }

  toggleForm = () => {
    this.props.resetCurrentAccount()
    this.setState({
      isShow: !this.state.isShow
    })
  }

  render() {
    return (<div>
      <div className="row bottom-buffer">
        <div className="col-md-4">
          <button className="btn btn-secondary" type="button" onClick={() => this.toggleForm()}>
            {
              this.state.isShow
                ? 'Hide'
                : 'Show'
            }
            Account Form</button>
        </div>
      </div>
      {
        this.state.isShow && <div className="row bottom-buffer">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <form>
                <Field name="url" label="URL" component={FieldComponent} type="text" validate={this.required} placeholder="https://example.com"/>
                <Field name="username" label="Username" component={FieldComponent} type="text" validate={this.required} placeholder="johdoe"/>
                <Field name="password" label="Password" component={FieldComponent} type="password" validate={[this.passwordStrength, this.required]}/>
                <fieldset className="form-group">
                  <button className="btn btn-secondary" type="reset" onClick={() => this.resetHandler()}>Reset</button>&nbsp;
                  <button className="btn btn-primary" type="button" onClick={this.props.handleSubmit(data => this.submitHandler(data))}>Save</button>
                </fieldset>
                <br/> {
                  this.props.isSuccess && <div className="alert alert-dismissible alert-success">
                      <button type="button" className="close" onClick={this.props.toggleSuccess}>&times;</button>
                      <strong>Well done!</strong>
                      You successfully save an account.
                    </div>
                }
              </form>
            </div>
            <div className="col-md-4"></div>
          </div>
      }
    </div>);
  }

}

const mapStateToProps = (state) => {
  return ({
  accounts: state.accountReducer.accounts,
  isSuccess: state.accountReducer.isSuccess,
  initialValues: state.accountReducer.currentAccount
})
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAddAccount: (account) => dispatch(fetchAddAccount(account)),
    fetchUpdateAccount: (account) => dispatch(fetchUpdateAccount(account)),
    toggleSuccess: () => dispatch(toggleSuccess()),
    resetCurrentAccount: () => dispatch(resetCurrentAccount())
  }
}

FormContainer = reduxForm({form: 'password_manager', enableReinitialize: true})(FormContainer)

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer)
