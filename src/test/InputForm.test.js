import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'

import App from '../App';
import RootContainer from "../RootContainer"

Enzyme.configure({ adapter: new Adapter() })

describe('<App />', () => {
  it('Should render App tree', () => {
    const wrapper = shallow(<App />)
    // console.log(wrapper.debug());
    expect(wrapper.containsAnyMatchingElements([
      <div></div>,
      <RootContainer />
    ])).to.equal(true)
  })

  it('Should have 1 div', () => {
    const wrapper = shallow(<App />)
    // console.log(wrapper);
    expect(wrapper.find('.App')).to.have.length(1)
  })
})
