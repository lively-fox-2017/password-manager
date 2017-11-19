import React, { Component } from 'react';
import { Notification } from 'reactbulma';
import CheckList from '../molecules/CheckList';

class PasswordValidator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLengthGT5: false,
      isUpperCaseFound: false,
      isLowerCaseFound: false,
      isNumberFound: false,
    }
    this.lengthValidator = this.lengthValidator.bind(this);
    this.upperCaseValidator = this.upperCaseValidator.bind(this);
    this.lowerCaseValidator = this.lowerCaseValidator.bind(this);
    this.numberValidator = this.numberValidator.bind(this);
  }

  lengthValidator() {
    const state = this.props.password.length > 5;
    if (state !== this.state.isLengthGT5){
      this.setState({
        isLengthGT5: state,
      })
    }
  }

  upperCaseValidator() {
    const state = /(?=.*[A-Z])/.test(this.props.password);
    if (state !== this.state.isUpperCaseFound){
      this.setState({
        isUpperCaseFound: state,
      })
    }
  }

  lowerCaseValidator() {
    const state = /(?=.*[a-z])/.test(this.props.password);
    if (state !== this.state.isLowerCaseFound){
      this.setState({
        isLowerCaseFound: state,
      })
    }
  }

  numberValidator() {
    const state = /(?=.*\d)/.test(this.props.password);
    if (state !== this.state.isNumberFound){
      this.setState({
        isNumberFound: state,
      })
    }
  }

  componentDidUpdate() {
    this.lengthValidator();
    this.upperCaseValidator();
    this.lowerCaseValidator();
    this.numberValidator();
  }

  render() {
    return (
      <Notification primary>
        <h4><strong>Secure password guide: </strong></h4>
        <CheckList isChecked={this.state.isLengthGT5} sentence="Password need to be at least 5 character length."/>
        <CheckList isChecked={this.state.isUpperCaseFound} sentence="Password need to have at least one upper-case letter."/>
        <CheckList isChecked={this.state.isLowerCaseFound} sentence="Password need to have at least one lower-case letter."/>
        <CheckList isChecked={this.state.isNumberFound} sentence="Password need to have at least one number."/>
        <CheckList sentence="Password need to have at least one special character."/>
      </Notification>
    )
  }
}

export default PasswordValidator;
