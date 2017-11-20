import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PasswordModal } from './components/PasswordModal';
import PasswordFields from './components/PasswordFields';

Enzyme.configure({ adapter: new Adapter() });

const initialState = {
  newPassword: { url: '', username: '', password: '' },
  strongPassword: false,
  oneLowercase: false,
  oneUppercase: false,
  oneNumber: false,
  oneSpecialChar: false,
  passwordLength: false
};

const passwordModal = new PasswordModal();

const passwordModalComponent = mount(
  <PasswordModal show={ true }/>
);

const passwordFieldsComponent = (
  <PasswordFields
    newPassword={ initialState.newPassword }
    handleInputChange={ passwordModal.handleInputChange }
  />
);

const passwordTextBox = passwordModalComponent
                        .mount(passwordFieldsComponent)
                        .find('input')
                        .at(2);

describe('PasswordModal States', () => {
  test("Initial state check", () => {
    expect(passwordModalComponent.state()).toEqual(initialState);
  });

  test('oneLowercase and passwordLength state should equal true', () => {
    passwordTextBox.simulate('change', {
      target: {
        value: 'lowercase'
      }
    });

    expect(passwordModalComponent.state('oneLowercase')).toEqual(true);
    expect(passwordModalComponent.state('passwordLength')).toEqual(true);
  });

  test('oneUppercase and passwordLength state should equal true', () => {
    passwordTextBox.simulate('change', {
      target: {
        value: 'Uppercase'
      }
    });

    expect(passwordModalComponent.state('oneUppercase')).toEqual(true);
    expect(passwordModalComponent.state('passwordLength')).toEqual(true);
  });

  test('oneSpecialChar state should equal true and passwordLength state should equal false', () => {
    passwordTextBox.simulate('change', {
      target: {
        value: '@dm'
      }
    });

    expect(passwordModalComponent.state('oneSpecialChar')).toEqual(true);
    expect(passwordModalComponent.state('passwordLength')).toEqual(false);
  });

  test('oneNumber state should equal true and passwordLength state should equal false', () => {
    passwordTextBox.simulate('change', {
      target: {
        value: 'w33'
      }
    });

    expect(passwordModalComponent.state('oneNumber')).toEqual(true);
    expect(passwordModalComponent.state('passwordLength')).toEqual(false);
  });

  test('strongPassword state should equal true', () => {
    passwordTextBox.simulate('change', {
      target: {
        value: '$eCret7'
      }
    });

    expect(passwordModalComponent.state('strongPassword')).toEqual(true);
  });
});
