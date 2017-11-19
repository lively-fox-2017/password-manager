import React, { Component } from 'react';

class PasswordWidgets extends Component {
  render() {
    return (
      <div className="alert alert-warning" role="alert">
        Password Strength: <br/>
        <span className={ 'glyphicon glyphicon-' + ( this.props.oneLowercase ? 'check' : 'unchecked' ) }></span> At least one lowercase character <br/>
        <span className={ 'glyphicon glyphicon-' + ( this.props.oneUppercase ? 'check' : 'unchecked' ) }></span> At least one uppercase character <br/>
        <span className={ 'glyphicon glyphicon-' + ( this.props.oneNumber ? 'check' : 'unchecked' ) }></span> At least one number <br/>
        <span className={ 'glyphicon glyphicon-' + ( this.props.oneSpecialChar ? 'check' : 'unchecked' ) }></span> At least one special character (!@#$%^&*) <br/>
        <span className={ 'glyphicon glyphicon-' + ( this.props.passwordLength ? 'check' : 'unchecked' ) }></span> At least 5 characters
      </div>
    );
  }
}

export default PasswordWidgets;
