import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import  Main  from './components/main'
import sinon from 'sinon'
import Enzyme, { shallow, mount, render } from 'enzyme';
import { Provider } from 'react-redux';
import store from './store/store'
import Adapter from 'enzyme-adapter-react-16';

const willMount = sinon.spy();
const didMount = sinon.spy();
const willUnmount = sinon.spy();

Enzyme.configure({ adapter: new Adapter() });

it('test the environment', () => {
  test('should work', () => {
    expect(true).toEqual(true)
  })
});

it('should contain', () => {
  const wrapper = shallow(<Provider store={store} fetchData = {() => {console.log('halo')}}><div><Main/></div></Provider>)
  expect(willMount.callCount).toEqual(0)
})

it('should contain', () => {
  const wrapper = shallow(<Provider store={store} fetchData = {() => {console.log('halo')}}><div><Main/></div></Provider>)
  expect(didMount.callCount).toEqual(0)
})

it('should contain tags', () => {
  const wrapper = shallow(<Provider store={store}><div><Main/></div></Provider>)
  console.log(wrapper.length)
  expect(wrapper.length === 1).toEqual(true)
})