import React, { Component } from 'react';

class PasswordFields extends Component {
  render() {
    return(
      <div>
        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input type="text" name="url" className="form-control" autoComplete="off" value={ this.props.newPassword.url } onChange={ this.props.handleInputChange } required/>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" className="form-control" autoComplete="off" value={ this.props.newPassword.username } onChange={ this.props.handleInputChange } required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="text" name="password" className="form-control" autoComplete="off" value={ this.props.newPassword.password } onChange={ this.props.handlePasswordChange } required/>
        </div>
      </div>
    );
  }
}

export default PasswordFields;
