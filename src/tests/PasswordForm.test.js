import React from 'react'
import { shallow, mount } from 'enzyme'
import { SubmissionError, reduxForm, Field } from 'redux-form'

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import owasp from 'owasp-password-strength-test'

Enzyme.configure({ adapter: new Adapter() });

import {Card, CardHeader, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'

import { PasswordForm, renderPasswordField, renderTextField, redux_form } from '../components/PasswordForm'
import { Main } from '../components/Main'
import { createStore } from "redux";
import { Provider } from 'react-redux';

const fakeReducer = (state = {}) => state;
const store = createStore(
  fakeReducer,
);

owasp.config({
  allowPassphrases       : true,
  maxLength              : 128,
  minLength              : 5,
  minPhraseLength        : 20,
  minOptionalTestsToPass : 6,
});

describe('PasswordForm Component', () => {
  let submitting, touched, error, reset, onSave, handleSubmit, pristine
	beforeEach(() => {
		submitting = false
    pristine = true
		touched = false
		error = null
		reset = null
		handleSubmit = fn => fn
	})
  it('should render card button and field', () => {
    const props = {
			fields: {
				url: {
					value: '',
					touched: true,
					error: error
				},
        username: {
          value: '',
          touched: touched,
          error: error
        },
        password: {
          value: '',
          touched: touched,
          error: error
        }
			},
			handleSubmit: fn => fn,
			reset
		}
    const input = { name: 'url', value: '' }
		const label = 'URL'
		const meta = { touched: true, error: 'Required' }
    const wrapper = mount(<redux_form {...props} handleSubmit={handleSubmit}/>)
    expect(wrapper.containsAllMatchingElements([
      <MuiThemeProvider />,
      <Card />,
      <CardHeader />,
      <CardText />,
      <Field
        name="url"
        component={renderTextField}
        label="URL"
      />,
      <button type="button">Submit</button>,
      <button type="button">Clear Values</button>
    ]))
  })
})

describe('passwordInput', () => {
	it('should give error The password must be at least 5 characters long.', () => {
    var inputValue = 'aa'
    var error = ''
    if(owasp.test(inputValue).strong) {
      error = undefined
    } else {
      error = owasp.test(inputValue).requiredTestErrors
    }
    const input = { name: 'password', value: inputValue }
    const label = 'Password'
    const meta = { touched: true, error: error }
    const element = renderPasswordField({ input, label, meta })
    const wrapper = mount(<MuiThemeProvider>{element}</MuiThemeProvider>)
    var errorResponse = wrapper.find('div').last().text()
    expect(errorResponse).toEqual(error[0])
  })
  it('should give error The password must contain at least one uppercase letter.', () => {
    var inputValue = 'abuba'
    var error = ''
    if(owasp.test(inputValue).strong) {
      error = undefined
    } else {
      error = owasp.test(inputValue).errors[0]
    }
    const input = { name: 'password', value: inputValue }
    const label = 'Password'
    const meta = { touched: true, error: error }
    const element = renderPasswordField({ input, label, meta })
    const wrapper = mount(<MuiThemeProvider>{element}</MuiThemeProvider>)
    var errorResponse = wrapper.find('div').last().text()
    expect(errorResponse).toEqual(error)
  })
  it('should give error The password must contain at least one number.', () => {
    var inputValue = 'Tuturu'
    var error = ''
    if(owasp.test(inputValue).strong) {
      error = undefined
    } else {
      error = owasp.test(inputValue).errors[0]
    }
    const input = { name: 'password', value: inputValue }
    const label = 'Password'
    const meta = { touched: true, error: error }
    const element = renderPasswordField({ input, label, meta })
    const wrapper = mount(<MuiThemeProvider>{element}</MuiThemeProvider>)
    var errorResponse = wrapper.find('div').last().text()
    expect(errorResponse).toEqual(error)
  })
  it('should give error The password must contain at least one special character.', () => {
    var inputValue = 'Tuturu1'
    var error = ''
    if(owasp.test(inputValue).strong) {
      error = undefined
    } else {
      error = owasp.test(inputValue).errors[0]
    }
    const input = { name: 'password', value: inputValue }
    const label = 'Password'
    const meta = { touched: true, error: error }
    const element = renderPasswordField({ input, label, meta })
    const wrapper = mount(<MuiThemeProvider>{element}</MuiThemeProvider>)
    var errorResponse = wrapper.find('div').last().text()
    expect(errorResponse).toEqual(error)
  })
  it('should not give error', () => {
    var inputValue = 'Tuturu1~'
    var error = ''
    if(owasp.test(inputValue).strong) {
      error = undefined
    } else {
      error = owasp.test(inputValue).errors[0]
    }
    const input = { name: 'password', value: inputValue }
    const label = 'Password'
    const meta = { touched: true, error: error }
    const element = renderPasswordField({ input, label, meta })
    const wrapper = mount(<MuiThemeProvider>{element}</MuiThemeProvider>)
    var errorResponse = wrapper.find('div').last().text()
    expect(errorResponse).toEqual("")
  })
})
