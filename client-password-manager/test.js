import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import renderer from 'react-test-renderer';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from "react-router-dom";

import App from './App';
import List from './components/List'
import Form from './components/Form'
import EditForm from './components/EditForm'
import store from './store'
// import { upperCaseCheck } from "./components/Form";


configure({ adapter: new Adapter() })

it('should correct render', () => {
    const wrapper = shallow(
        <Provider>
            <Router>
                <List />
            </Router>
        </Provider>)
    const form = wrapper.containsAllMatchingElements([<Form />])
    expect(form)
})

describe('component list of List Component', () => {
    it('should have to render some components', () => {
        const wrapper = shallow(
            <Provider>
                <Router>
                    <List />
                </Router>
            </Provider>
        )
        expect(wrapper.containsAllMatchingElements([<table />]))
    })
})

describe('search fitur', () => {
    it('component in List, have a search fitur', () => {
        const wrapper = shallow(
            <Provider>
                <Router>
                    <List />
                </Router>
            </Provider>
        )
        expect(wrapper.find('#search-form'))
    })
})

describe('table for data', () => {
    it('component in List, have a table component for data', () => {
        const wrapper = shallow(
            <Provider>
                <Router>
                    <List />
                </Router>
            </Provider>
        )
        expect(wrapper.find('table'))
    })
})

describe('delete and edit fitur', () => {
    it('component in list, have delete and edit fitur', () => {
        const wrapper = shallow(
            <Provider>
                <Router>
                    <List />
                </Router>
            </Provider>
        )
        expect(wrapper.find('#edit-button'))
    })
})

describe('delete and edit fitur', () => {
    it('component in list, have delete and edit fitur', () => {
        const wrapper = shallow(
            <Provider>
                <Router>
                    <List />
                </Router>
            </Provider>
        )
        expect(wrapper.find('#delete-button'))
    })
})

describe('input data component in Form component', () => {
    it('should correct render', () => {
        const wrapper = shallow(
            <Provider>
                <Router>
                    <List>
                        <Form />
                    </List>
                </Router>
            </Provider>
        )
        expect(wrapper.containsAllMatchingElements([<input />]))
    })
})

// describe('validation fitur in Form Component', () => {
//   it('should have uppercase validation function', () => {
//     const wrapper = shallow(
//       <Provider>
//         <Router>
//           <List>
//             <Form/>
//           </List>
//         </Router>
//       </Provider>
//     )
//     const instance = wrapper.instance()
//     const uppercase = sinon.spy(instance, 'upperCaseCheck')
//     wrapper.find('input').simulate('change')
//     expect(uppercase.called).toEqual(true)
//   })
// })

describe('form input for url', () => {
    it('should have input for url', () => {
        const wrapper = shallow(
            <Provider>
                <Router>
                    <List>
                        <Form />
                    </List>
                </Router>
            </Provider>
        )
        expect(wrapper.find('#url-input'))
    })
})

describe('form input for username', () => {
    it('should have input for username', () => {
        const wrapper = shallow(
            <Provider>
                <Router>
                    <List>
                        <Form />
                    </List>
                </Router>
            </Provider>
        )
        expect(wrapper.find('#username-input'))
    })
})

describe('form input for password', () => {
    it('should have input for password', () => {
        const wrapper = shallow(
            <Provider>
                <Router>
                    <List>
                        <Form />
                    </List>
                </Router>
            </Provider>
        )
        expect(wrapper.find('#password-input'))
    })
})

describe('render Edit Form', () => {
    it('should have render EditForm component normally', () => {
        const wrapper = shallow(
            <Provider>
                <Router>
                    <EditForm />
                </Router>
            </Provider>
        )
        expect(wrapper.containsAllMatchingElements([<EditForm />]))
    })
})

describe('have input in EditForm Component', () => {
    it('should have input form', () => {
        const wrapper = shallow(
            <Provider>
                <Router>
                    <EditForm />
                </Router>
            </Provider>
        )
        expect(wrapper.containsAllMatchingElements([<input />]))
    })
})

describe('Link To Component', () => {
    it('should Link to another router component', () => {
        const wrapper = shallow(
            <Provider>
                <Router>
                    <EditForm />
                </Router>
            </Provider>
        )
        expect(wrapper.containsAllMatchingElements([<Link />]))
    })
})
