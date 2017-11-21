import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme , { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import {ComponentPasswordForm} from './ComponentPasswordForm'
import store from './store'
import { Provider } from 'react-redux'

Enzyme.configure({ adapter: new Adapter() });



describe('<ComponentPasswordForm />', () => {
  it('should render one <form /> components', () => {
    const wrapper = shallow(<App />);
    // console.log(wrapper.debug());
    // console.log(wrapper);
    expect(wrapper.find('Provider')).to.have.length(1);
  });

})
