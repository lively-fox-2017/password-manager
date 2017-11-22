import React, { Component } from 'react'

// import { getUserData } from '../actions/userAction'
// import store from './store'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      url: '',
      username: '',
      password: '',
      createdAt: '',
      updatedAt: ''
    }
  }

  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label> URL </label>
            <input type="text" className="form-control" id="text" />
          </div>
          <div className="form-group">
            <label> username </label>
            <input type="text" className="form-control" id="text" />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" className="form-control" id="pwd" />
          </div>
          <button type="submit" className="btn btn-primary"> Save </button>
        </form>
      </div>
    )
  }
}

export default Register
