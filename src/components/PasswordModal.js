import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { createPassword } from '../actions/passwordActions';
import PasswordFields from './PasswordFields';
import PasswordWidgets from './PasswordWidgets';

const mapDispatchToProps = (dispatch) => {
  return {
    createPassword: (newPassword, callback) => dispatch(createPassword(newPassword, callback)),
  }
};

class PasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: {
        url: '',
        username: '',
        password: '',
      },
      strongPassword: false,
      oneLowercase: false,
      oneUppercase: false,
      oneNumber: false,
      oneSpecialChar: false,
      passwordLength: false,
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.initialState = this.initialState.bind(this);
    this.savePassword = this.savePassword.bind(this);
  }

  handlePasswordChange(e) {
    const typedPassword = e.target.value;

    // RegEx Tests
    let strongPassword = false;
    const oneLowercase   = new RegExp('^(?=.*[a-z])').test(typedPassword);
    const oneUppercase   = new RegExp('^(?=.*[A-Z])').test(typedPassword);
    const oneNumber      = new RegExp('(?=.*[0-9])').test(typedPassword);
    const oneSpecialChar = new RegExp('(?=.*[!@#$%^&*])').test(typedPassword);
    const passwordLength = new RegExp('(?=.{5,})').test(typedPassword);

    if (oneLowercase && oneUppercase && oneNumber && oneSpecialChar && passwordLength) {
      strongPassword = true;
    }

    const newPassword = this.state.newPassword;
    newPassword.password = typedPassword;

    this.setState({
      newPassword,
      strongPassword: strongPassword,
      oneLowercase: oneLowercase,
      oneUppercase: oneUppercase,
      oneNumber: oneNumber,
      oneSpecialChar: oneSpecialChar,
      passwordLength: passwordLength,
    });

  }

  handleInputChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    const newPassword = this.state.newPassword;

    newPassword[name] = value;

    this.setState({
      newPassword
    });
  }

  initialState() {
    this.setState({
      newPassword: {
        url: '',
        username: '',
        password: '',
      },
      strongPassword: false,
      oneLowercase: false,
      oneUppercase: false,
      oneNumber: false,
      oneSpecialChar: false,
      passwordLength: false,
    });
  }

  savePassword(e) {
    e.preventDefault();
    if (this.state.strongPassword) {
      this.props.createPassword(this.state.newPassword, () => {
        // Hide modal
        this.props.onHide();

        window.$swal({
          title: 'Nice!',
          text: 'Your password has been saved',
          icon: 'success'
        });

        this.initialState();
      });
    } else {
      window.$swal({
        title: 'Oops!',
        text: 'You have to make sure your password is strong enough',
        icon: 'error'
      });
    }
  }

  render() {
    return (
      <Modal show={ this.props.show } onHide={ this.props.onHide } keyboard={ false } bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Add a Password</Modal.Title>
        </Modal.Header>
        <form onSubmit={ this.savePassword } method="post">
          <Modal.Body>
            <PasswordFields
              newPassword={ this.state.newPassword }
              handleInputChange={ this.handleInputChange }
              handlePasswordChange={ this.handlePasswordChange }/>
            <PasswordWidgets
              oneLowercase={ this.state.oneLowercase }
              oneUppercase={ this.state.oneUppercase }
              oneNumber={ this.state.oneNumber }
              oneSpecialChar={ this.state.oneSpecialChar }
              passwordLength={ this.state.passwordLength }
            />
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <a className="btn btn-default" onClick={ this.props.onHide }>
              Close
            </a>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(PasswordModal);
