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

const passwordModalComponent = shallow(
  <PasswordModal show={ true }/>
);

describe('PasswordModal component', () => {
  test("Initial state check", () => {
    expect(passwordModalComponent.state()).toEqual(initialState);
  });

  test("oneLowercase state should equal true", () => {
    const passwordFieldsComponent = shallow(
      <PasswordFields
        newPassword={ initialState.newPassword }
        handleInputChange={ passwordModal.handleInputChange }
      />
    );

    const urlTextBox = passwordFieldsComponent.find('input').at(1);

    urlTextBox.simulate('change', { target: { value: 'dimitri' } });
  });
});
