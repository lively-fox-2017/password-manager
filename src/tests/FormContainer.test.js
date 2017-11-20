import React from 'react'
import { expect } from 'chai'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { reducer as formReducer } from 'redux-form'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import {FormContainer} from '../containers/FormContainer'
import FieldComponent from '../components/FieldComponent'

Enzyme.configure({adapter: new Adapter()})

describe('FormContainer', () => {
  let store, subject
  beforeEach(() => {
    store = createStore(combineReducers({form: formReducer}))
    const props = {
      handleSubmit: fn => fn
    }
    subject = shallow(
      <Provider store={store}>
        <FormContainer {...props} isSuccess={false} initialValues={null} />
      </Provider>
    ).dive()
  });
  it('Shows error when password is set to blank', () => {
    subject.setState({isShow: true}, () => {
    })
    const input = subject.find("Field").first()
    input.dive()
    console.log(input.debug());
    input.simulate('blur')
    // const helpBlock = subject.find('.form-control-feedback').first()
    // expect(helpBlock).to.have.length.of(1)
    // expect(helpBlock.text()).to.equal('This field is required')
  });
});

// describe('FormContainer Test Input', () => {
//   it('renders in an error state', () => {
//     const inputUrl = {name: 'url', value: ''}
//     const label = 'URL'
//     const meta = {touched: true, error: ['Required']}
//     const element = shallow(<FieldComponent name={inputUrl.name} value={inputUrl.value} label={label} meta={meta} />)
//     console.log(element.debug())
//     const helpBlock = element.find('.form-control-feedback').first()
//     expect(helpBlock.text()).to.equal('Required')
//   });
// })
