import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import { Home } from './components/Home';
import { PasswordForm } from './components/PasswordForm';
import { EditCredential } from './components/EditCredential';

Enzyme.configure({ adapter: new Adapter() });

const fakeCredentials = [
  {
    "url": "user.com",
    "username": "user",
    "password": "Uus3r#",
    "createdAt": "2017-11-20T04:46:39.517Z",
    "updatedAt": "2017-11-20T04:46:52.566Z",
    "id": 4
  }
];

describe('Test for Home component', () => {
  const HomeComponent = shallow(<Home credentials={ fakeCredentials }/>);
  const Divs = HomeComponent.children().find('div');
  const Ps = HomeComponent.find('p');
  const Div = Divs.at(0);

  test('Length should equal to one', () => {
    expect(HomeComponent).toHaveLength(1);
  });

  test(`Should have ${fakeCredentials.length} divs as its children`, () => {
    expect(Divs).toHaveLength(fakeCredentials.length);
  });

  test('Div should have delete button', () => {
    expect(Div.find('button').at(1).text()).toEqual('Delete');
  });

  test('Div should have <Link /> button', () => {
    expect(Div.find('button').at(0).text()).toEqual('<Link />');
  });

  test('Div should have URL', () => {
    expect(Ps.at(0).text()).toEqual(`URL: ${fakeCredentials[0].url}`);
  });

  test('Div should have USERNAME', () => {
    expect(Ps.at(1).text()).toEqual(`USERNAME: ${fakeCredentials[0].username}`);
  });

    test('Div should have PASSWORD', () => {
    expect(Ps.at(2).text()).toEqual(`PASSWORD: ${fakeCredentials[0].password}`);
  });
});

describe('Test for PasswordForm component', () => {
  const PasswordFormComponent = shallow(<PasswordForm />);

  test('Should have password form', () => {
    expect(PasswordFormComponent.find('#password-form')).toBeTruthy();
  });

  test('Should have three input fields', () => {
    expect(PasswordFormComponent.find('#password-form').find('input')).toHaveLength(3);
  });

  test('Should have save button', () => {
    expect(PasswordFormComponent.find('button').text()).toEqual('SAVE');
  });

  test('Should have password validation widget', () => {
    expect(PasswordFormComponent.find('.password-validation')).toBeTruthy();
  });

  test('Should have password uppercase checker widget', () => {
    expect(PasswordFormComponent.find('.password-validation').find('p').at(0).text())
    .toMatch(/password must have minimum one uppercase letter$/);
  });

  test('Should have password lowercase checker widget', () => {
    expect(PasswordFormComponent.find('.password-validation').find('p').at(1).text())
    .toMatch(/password must have minimum one lowercase letter$/);
  });
  
  test('Should have password special character checker widget', () => {
    expect(PasswordFormComponent.find('.password-validation').find('p').at(2).text())
    .toMatch(/password must have minimum one special character$/);
  });

  test('Should have password number checker widget', () => {
    expect(PasswordFormComponent.find('.password-validation').find('p').at(3).text())
    .toMatch(/password must have minimum one number$/);
  });

  test('Should have password length checker widget', () => {
    expect(PasswordFormComponent.find('.password-validation').find('p').at(4).text())
    .toMatch(/password must have minimum 6 characters$/);
  });
});

describe('Test for EditCredential component', () => {
  const EditCredentialComponent = shallow(<EditCredential credentials={ fakeCredentials } id={ fakeCredentials[0].id }/>);
  

  test('Should have edit credential form', () => {
    expect(EditCredentialComponent.find('#edit-credential')).toBeTruthy();
  });

  test('Should have url', () => {
    expect(EditCredentialComponent.find('input').at(0).prop('value')).toEqual(fakeCredentials[0].url)
  });

  test('Should have username', () => {
    expect(EditCredentialComponent.find('input').at(1).prop('value')).toEqual(fakeCredentials[0].username)
  });

  test('Should have password', () => {
    expect(EditCredentialComponent.find('input').at(2).prop('value')).toEqual(fakeCredentials[0].password)
  });

  test('Should have password validation widget', () => {
    expect(EditCredentialComponent.find('.password-validation')).toBeTruthy();
  });

  test('Should have password uppercase checker widget', () => {
    expect(EditCredentialComponent.find('.password-validation').find('p').at(0).text())
    .toMatch(/password must have minimum one uppercase letter$/);
  });

  test('Should have password lowercase checker widget', () => {
    expect(EditCredentialComponent.find('.password-validation').find('p').at(1).text())
    .toMatch(/password must have minimum one lowercase letter$/);
  });
  
  test('Should have password special character checker widget', () => {
    expect(EditCredentialComponent.find('.password-validation').find('p').at(2).text())
    .toMatch(/password must have minimum one special character$/);
  });

  test('Should have password number checker widget', () => {
    expect(EditCredentialComponent.find('.password-validation').find('p').at(3).text())
    .toMatch(/password must have minimum one number$/);
  });

  test('Should have password length checker widget', () => {
    expect(EditCredentialComponent.find('.password-validation').find('p').at(4).text())
    .toMatch(/password must have minimum 6 characters$/);
  });
});

describe('Password validation test', () => {
  const PasswordFormComponent = mount(<PasswordForm />);
  const passwordInput = PasswordFormComponent.find('input').at(2);
  const saveButton = PasswordFormComponent.find('#password-form').find('button');

  const isPasswordValidated = (passwordValidationState) => {
    return passwordValidationState.haveUppercase && 
            passwordValidationState.haveLowercase &&
            passwordValidationState.haveSpecialChar &&
            passwordValidationState.haveNumber &&
            passwordValidationState.lengthBiggerThanFive;
  };

  test('Should return false when password is empty', () => {
    passwordInput.simulate('change', {target: {value: ''}});
    const passwordValidation = PasswordFormComponent.state('passwordValidation');

    expect(isPasswordValidated(passwordValidation)).toEqual(false);
  });

  test('Should return false when password does not have minimum one uppercase letter', () => {
    passwordInput.simulate('change', {target: {value: 'us3r!!'}});
    expect(PasswordFormComponent.state('passwordValidation').haveUppercase).toEqual(false);
  });

  test('Should return false when password does not have minimum one lowercase letter', () => {
    passwordInput.simulate('change', {target: {value: 'US3R!!'}});
    expect(PasswordFormComponent.state('passwordValidation').haveLowercase).toEqual(false);
  });

  test('Should return false when password does not have minimum one special character', () => {
    passwordInput.simulate('change', {target: {value: 'us3rrr'}});
    expect(PasswordFormComponent.state('passwordValidation').haveSpecialChar).toEqual(false);
  });

  test('Should return false when password does not have minimum one number', () => {
    passwordInput.simulate('change', {target: {value: 'User!!'}});
    expect(PasswordFormComponent.state('passwordValidation').haveNumber).toEqual(false);
  });

  test('Should return false when password have length not bigger than five', () => {
    passwordInput.simulate('change', {target: {value: 'Us3r!'}});
    expect(PasswordFormComponent.state('passwordValidation').lengthBiggerThanFive).toEqual(false);
  });

  test('Should return true when password is valid', () => {
    passwordInput.simulate('change', {target: {value: 'Us3r!!'}});
    const passwordValidation = PasswordFormComponent.state('passwordValidation');

    expect(isPasswordValidated(passwordValidation)).toEqual(true);
  });
});
