import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme , { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

import { ComponentPasswordForm } from './ComponentPasswordForm'
// import store from './store'
// import { Provider } from 'react-redux'

Enzyme.configure({ adapter: new Adapter() });



describe('<div className="container" />', () => {
  it('should render ten <div /> components', () => {
    const wrapper = shallow(<ComponentPasswordForm />);
    // console.log(wrapper.debug());
    // console.log(wrapper);
    expect(wrapper.find('div')).to.have.length(10);
  });

  it('Should return status true for upperCase input', () => {
    const wrapper = shallow(<ComponentPasswordForm />)
    wrapper.find('.passwordtext').simulate('change', {
      target: {
        value: 'UPPERCASE',
        name : 'Password'
      }
    });
    expect(wrapper.state().oneUpper).to.equal(true);
  })

  it('Should return status true for lowerCase input', () => {
    const wrapper = shallow(<ComponentPasswordForm />)
    wrapper.find('.passwordtext').simulate('change', {
      target: {
        value: 'lowercase',
        name : 'Password'
      }
    });
    expect(wrapper.state().oneLower).to.equal(true);
  })

  it('Should return status true for special input', () => {
    const wrapper = shallow(<ComponentPasswordForm />)
    wrapper.find('.passwordtext').simulate('change', {
      target: {
        value: '!@#$%^',
        name : 'Password'
      }
    });
    expect(wrapper.state().oneSpecial).to.equal(true);
  })

  it('Should return status true for number input', () => {
    const wrapper = shallow(<ComponentPasswordForm />)
    wrapper.find('.passwordtext').simulate('change', {
      target: {
        value: '123456',
        name : 'Password'
      }
    });
    expect(wrapper.state().oneNumber).to.equal(true);
  })

  it('Should return status true for lenght minimum 5 input', () => {
    const wrapper = shallow(<ComponentPasswordForm />)
    wrapper.find('.passwordtext').simulate('change', {
      target: {
        value: 'UPPERCASE',
        name : 'Password'
      }
    });
    expect(wrapper.state().lengthFive).to.equal(true);
  })

})
