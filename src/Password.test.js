import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PasswordModal } from './components/PasswordModal';

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

test("Initial state check", () => {
  const wrapper = shallow(<PasswordModal/>);
  expect(wrapper.state()).toEqual(initialState);
});
