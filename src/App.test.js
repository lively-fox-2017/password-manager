// import React from 'react';
// import ReactDOM from 'react-dom';
// import Enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
//
// import App from './App';
//
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

import 'jest-enzyme';
import { Router } from 'react-router-dom';
import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import Header from './organism/Header';
import { Title, SubTitle, Table, Button } from 'reactbulma';

describe('Header component testing', () => {
  const wrapper = shallow(<Header/>);

  it('Should render without exploding', () => {
    expect(
      wrapper.length
    ).toEqual(1);
  });

  it('Should have Title tag', () => {
    expect(
      wrapper.containsMatchingElement(<Title>
          <img/>
          Password Keeper
        </Title>)
    ).toEqual(true)
  });

  it('Should have SubTitle tag', () => {
    expect(
      wrapper.containsMatchingElement(<SubTitle>
          &#39;You shall not pass&#39;
        </SubTitle>)
    ).toEqual(true)
  })

})

import {AccountList} from './organism/AccountList';

describe('Account List Component Testing', () => {
  const props = {
    accounts: []
  }
  const wrapper = shallow(<AccountList {...props}/>);

  it('Should have search bar', () => {
    expect(
      wrapper.containsMatchingElement(
        <input/>
      )
    )
    expect(
      wrapper.find('input').prop('placeholder')
    ).toEqual('Search website')
  });

  it('Should have table of user account', () => {
    expect(
      wrapper.containsMatchingElement(Table)
    ).toEqual(true);

    expect(
      wrapper.containsMatchingElement(
        <Table.Th>
          Website
        </Table.Th>
      )
    ).toEqual(true);

    expect(
      wrapper.containsMatchingElement(
        <Table.Th>
          Username
        </Table.Th>
      )
    ).toEqual(true);

    expect(
      wrapper.containsMatchingElement(
        <Table.Th>
          Password
        </Table.Th>
      )
    ).toEqual(true);

    expect(
      wrapper.containsMatchingElement(
        <Table.Th>
          Created
        </Table.Th>
      )
    ).toEqual(true);

    expect(
      wrapper.containsMatchingElement(
        <Table.Th>
          Updated
        </Table.Th>
      )
    ).toEqual(true);
  });
});

import { SocMedAccountForm } from './organism/SocMedAccountForm';
import FormInput from './molecules/FormInput';

describe('SocMedAccountForm component test', () => {
  const wrapper = shallow(<SocMedAccountForm/>);

  expect(
    wrapper.find('FormInput').at(0).prop('label')
  ).toEqual('Username')

  expect(
    wrapper.find('FormInput').at(1).prop('label')
  ).toEqual('Password')

  expect(
    wrapper.find('FormInput').at(2).prop('label')
  ).toEqual('URL')

  expect(
    wrapper.containsMatchingElement(
      <Button>
        <i>
          Cancel
        </i>
      </Button>
    )
  ).toEqual(true)
});

import PasswordValidator from './organism/PasswordValidator'

describe('Password validator test when password empty', () => {
  const wrapper = mount(<PasswordValidator/>);
  wrapper.simulate('change', { props: { password: '1230912830129' } })
  for(let i = 0; i < 5; i++){
    expect(
      wrapper.find('i').at(i).hasClass('fa-square-o')
    ).toEqual(true)
  }
});

describe('Password validator test 5 character length', () => {
  const wrapper = mount(<PasswordValidator password="1234578"/>);
  wrapper.setProps({ password: "12345789" });
  wrapper.simulate('change', { props: { password: '1230912830129' } })
  expect(
    wrapper.find('i').at(0).hasClass('fa-check-square-o')
  ).toEqual(true)
});

describe('Password validator test upper case passed', () => {
  const wrapper = mount(<PasswordValidator password="1234578"/>);
  wrapper.setProps({ password: "Al123ay" });
  wrapper.simulate('change', { props: { password: 'Al123ay' } })
  expect(
    wrapper.find('i').at(1).hasClass('fa-check-square-o')
  ).toEqual(true)
});

describe('Password validator test lower case passed', () => {
  const wrapper = mount(<PasswordValidator password="1234578"/>);
  wrapper.setProps({ password: "Al3ay" });
  wrapper.simulate('change', { props: { password: 'Al3ay' } })
  expect(
    wrapper.find('i').at(2).hasClass('fa-check-square-o')
  ).toEqual(true)
});

describe('Password validator test has one number', () => {
  const wrapper = mount(<PasswordValidator password="1234578"/>);
  wrapper.setProps({ password: "Al3ay" });
  wrapper.simulate('change', { props: { password: 'Al3ay' } })
  expect(
    wrapper.find('i').at(3).hasClass('fa-check-square-o')
  ).toEqual(true)
});
