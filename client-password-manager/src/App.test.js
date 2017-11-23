import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import App from './App';
import store from './store/index'
import * as reduxActions from './actions/PasswordActions'

//enzyme & sinon
import EnzymeOgi from 'enzyme' //configure, mount, shallow
import EnzymeAdapter from 'enzyme-adapter-react-16'
import sinon from 'sinon';

//import component
import Form from './components/Form'
import Home from './components/Home'
import Search from './components/Search'
import PasswordTable from './components/SavedPassword'
import SearchResult from './components/SearchResult'


EnzymeOgi.configure({ adapter: new EnzymeAdapter() });

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });



describe('First test with enzyme-jest, finding header', () => {
  it('renders without crashing', () => {
    const wrapper = EnzymeOgi.shallow(
      <Router>
        <Provider store={store}>
          <Search />
        </Provider>
      </Router>
    )
    const form = wrapper.contains([<PasswordTable />])
    expect(form)
  })
})

describe('Form inside Home', () => {
  it('contains <FormPassword />', () => {
    const wrapper = EnzymeOgi.shallow(
      <Home />
    )
    const form = wrapper.contains(<Form />)
    expect(form).toEqual(true)
  })
})


describe('find Form component', () => {
  it('renders without crashing', () => {
    const wrapper = EnzymeOgi.shallow(
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>)
    const form = wrapper.containsAllMatchingElements([<Form />])
    expect(form)
  })
})

describe('find Home Component ', () => {
  it('renders without crashing', () => {
    const wrapper = EnzymeOgi.shallow(
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>)
    const form = wrapper.containsAllMatchingElements([<Home />])
    expect(form)
  })
})

describe('find Search Component ', () => {
  it('renders without crashing', () => {
    const wrapper = EnzymeOgi.shallow(
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>)
    const form = wrapper.contains([<Search />])
    expect(form)
  })
})

describe('find PasswordTable Component ', () => {
  it('renders without crashing', () => {
    const wrapper = EnzymeOgi.shallow(
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>)
    const form = wrapper.contains([<PasswordTable />])
    expect(form)
  })
})

describe('find SearchResult Component ', () => {
  it('renders without crashing', () => {
    const wrapper = EnzymeOgi.shallow(
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>)
    const form = wrapper.contains([<SearchResult />])
    expect(form)
  })
})

describe(`find Form input name: 'username'`, () => {
  it('renders without crashing', () => {
    const wrapper = EnzymeOgi.shallow(
      <Router>
        <Provider store={store}>
          <App>
            <Form />
          </App>
        </Provider>
      </Router>)
    const form = wrapper.find('username')
    expect(form)
  })
})

describe(`find Form input name: 'passoword'`, () => {
  it('renders without crashing', () => {
    const wrapper = EnzymeOgi.shallow(
      <Router>
        <Provider store={store}>
          <App>
            <Form />
          </App>
        </Provider>
      </Router>)
    const form = wrapper.find('password')
    expect(form)
  })
})

describe(`find Form input name: 'url'`, () => {
  it('renders without crashing', () => {
    const wrapper = EnzymeOgi.shallow(
      <Router>
        <Provider store={store}>
          <App>
            <Form />
          </App>
        </Provider>
      </Router>)
    const form = wrapper.find('url')
    expect(form)
  })
})

describe('actions test: GET_ALL_PASS', () => {
  it('should create an action getData', () => {
    const data = 'test'
    const expectedAction = {
      type: 'GET_ALL_PASS',
      payload: { data }
    }
    const form = reduxActions.getData(data)
    expect(form).toEqual(expectedAction)
  })
})

describe('actions test: GET_ALL_PASS', () => {
  it('should create an action getData', () => {
    const data = 'test'
    const expectedAction = {
      type: 'POST_PASS',
      payload: { data }
    }
    const form = reduxActions.postData(data)
    expect(form).toEqual(expectedAction)
  })
})

// it('simulates click events', () => {
//   const onButtonClick = sinon.spy();
//   const wrapper = shallow(<Form onButtonClick={onButtonClick} />);
//   wrapper.find('button').simulate('click');
//   expect(onButtonClick.calledOnce).to.equal(true);
// });


