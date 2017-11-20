import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'

import { InputForm } from "../InputForm"

Enzyme.configure({ adapter: new Adapter() })

describe('<form />', () => {
  it('Should render RootContainer tree that contain form', () => {
    const wrapper = shallow(<InputForm />)
    // console.log(wrapper.debug());
    expect(wrapper.containsAnyMatchingElements([
      <form />,
      <div />,
      <h3 />,
      <label />,
      <input />,
      <table />,
      <button />
    ])).to.equal(true)
  })

  it('Should have 3 div with className = has-success', () => {
    const wrapper = shallow(<InputForm />)
    expect(wrapper.find('.has-success')).to.have.length(3)
  })

  it('Should have 3 label', () => {
    const wrapper = shallow(<InputForm />)
    expect(wrapper.find('label')).to.have.length(3)
  })

  it('Should have 3 input', () => {
    const wrapper = shallow(<InputForm />)
    expect(wrapper.find('input')).to.have.length(3)
  })

  it('Should have 2 button', () => {
    const wrapper = shallow(<InputForm />)
    expect(wrapper.find('button')).to.have.length(2)
  })

  it('Should return status true for upperCase input', () => {
    const wrapper = shallow(<InputForm />)
    wrapper.find('.password').simulate('change', {
      target: {
        value: 'UPPERCASE',
        name: 'password'
      }
    });
    expect(wrapper.state().errors[0].status).to.equal(true);
  })

  it('Should return status false for non upperCase input', () => {
    const wrapper = shallow(<InputForm />)
    wrapper.find('.password').simulate('change', {
      target: {
        value: 'uppercase',
        name: 'password'
      }
    });
    expect(wrapper.state().errors[0].status).to.equal(false);
  })

  it('Should return status true for lowerCase input', () => {
    const wrapper = shallow(<InputForm />)
    wrapper.find('.password').simulate('change', {
      target: {
        value: 'lowercase',
        name: 'password'
      }
    });
    expect(wrapper.state().errors[1].status).to.equal(true);
  })

  it('Should return status false for non lowerCase input', () => {
    const wrapper = shallow(<InputForm />)
    wrapper.find('.password').simulate('change', {
      target: {
        value: 'LOWERCASE',
        name: 'password'
      }
    });
    expect(wrapper.state().errors[1].status).to.equal(false);
  })

  it('Should return status true for Special Character input', () => {
    const wrapper = shallow(<InputForm />)
    wrapper.find('.password').simulate('change', {
      target: {
        value: '#$@!&%^*-+?',
        name: 'password'
      }
    });
    expect(wrapper.state().errors[2].status).to.equal(true);
  })

  it('Should return status false for non Special Character input', () => {
    const wrapper = shallow(<InputForm />)
    wrapper.find('.password').simulate('change', {
      target: {
        value: 'specialchar',
        name: 'password'
      }
    });
    expect(wrapper.state().errors[2].status).to.equal(false);
  })

  it('Should return status true for Number input', () => {
    const wrapper = shallow(<InputForm />)
    wrapper.find('.password').simulate('change', {
      target: {
        value: '12345',
        name: 'password'
      }
    });
    expect(wrapper.state().errors[3].status).to.equal(true);
  })

  it('Should return status false for non Number input', () => {
    const wrapper = shallow(<InputForm />)
    wrapper.find('.password').simulate('change', {
      target: {
        value: 'number',
        name: 'password'
      }
    });
    expect(wrapper.state().errors[3].status).to.equal(false);
  })

  it('Should return status true for input length more than 4', () => {
    const wrapper = shallow(<InputForm />)
    wrapper.find('.password').simulate('change', {
      target: {
        value: '12345',
        name: 'password'
      }
    });
    expect(wrapper.state().errors[4].status).to.equal(true);
  })

  it('Should return status false for input length less than 5', () => {
    const wrapper = shallow(<InputForm />)
    wrapper.find('.password').simulate('change', {
      target: {
        value: '1234',
        name: 'password'
      }
    });
    expect(wrapper.state().errors[4].status).to.equal(false);
  })
})
