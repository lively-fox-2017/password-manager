import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import App from '../App'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../Header'
import Main from '../Main'

Enzyme.configure({ adapter: new Adapter() });
describe('<App />', () => {
  it('renders three <App /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsAllMatchingElements([<Header/>, <Main />])).to.be.true
  });
});