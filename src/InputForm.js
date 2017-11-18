import React from 'react'
import { connect } from 'react-redux'
import Chance from 'chance'

import { inputAccount } from './actions/managerAction'

const chance = new Chance()

class InputForm extends React.Component {
  constructor() {
    super()
    this.state = {
      account: {
        id: chance.guid(),
        url: '',
        username: '',
        password: '',
        createdAt: new Date(),
        updatedAt: ''
      }
    }
  }

  handleInput = (e) => {
    let state = this.state.account
    state[e.target.name] = e.target.value

    this.setState(state)

    // console.log(this.state);
  }

  handleInputAccount = (e) => {
    e.preventDefault()

    // console.log(this.state.account);
    this.props.accountInput(this.state.account)

    this.setState({
      account: {
        id: chance.guid(),
        url: '',
        username: '',
        password: '',
        createdAt: new Date(),
        updatedAt: ''
      }
    })
  }

  render() {
    const { url, username, password } = this.state.account
    return (
      <form onSubmit={ this.handleInputAccount }>
        <h3>Input Form</h3><br />
        <div className="form-group has-success">
          <label className="control-label" htmlFor="inputSuccess">URL</label>
          <input className="form-control text-center" id="inputSuccess" name="url" type="text" value={ url } onChange={ this.handleInput } required />
        </div>
        <div className="form-group has-success">
          <label className="control-label" htmlFor="inputSuccess">Username</label>
          <input className="form-control text-center" id="inputSuccess" name="username" type="text" value={ username } onChange={ this.handleInput } required />
        </div>
        <div className="form-group has-success">
          <label className="control-label" htmlFor="inputSuccess">Password</label>
          <input className="form-control text-center" id="inputSuccess" name="password" type="password" value={ password } onChange={ this.handleInput } required />
        </div>
        <div className="form-group">
          <div className="col-md-12 text-center">
            <button type="reset" className="btn btn-default">Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
    accountInput: (dataAccount) => dispatch(inputAccount(dataAccount))
})

export default connect(null, mapDispatchToProps)(InputForm)
