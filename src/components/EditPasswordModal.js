import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { updatePasswordById } from '../actions/passwordActions';
import PasswordFields from './PasswordFields';
import PasswordWidgets from './PasswordWidgets';

const mapDispatchToProps = (dispatch) => {
  return {
    updatePasswordById: (id, newPasswordInfo, callback) => dispatch(updatePasswordById(id, newPasswordInfo, callback)),
  }
};

class EditPasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strongPassword: true,
      oneLowercase: true,
      oneUppercase: true,
      oneNumber: true,
      oneSpecialChar: true,
      passwordLength: true,
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.initialState = this.initialState.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  handlePasswordChange(e) {
    this.props.changePasswordValue('password', e.target.value);

    // RegEx Tests
    let strongPassword = false;
    const oneLowercase   = new RegExp('^(?=.*[a-z])').test(this.props.password.password);
    const oneUppercase   = new RegExp('^(?=.*[A-Z])').test(this.props.password.password);
    const oneNumber      = new RegExp('(?=.*[0-9])').test(this.props.password.password);
    const oneSpecialChar = new RegExp('(?=.*[!@#$%^&*])').test(this.props.password.password);
    const passwordLength = new RegExp('(?=.{5,})').test(this.props.password.password);

    if (oneLowercase && oneUppercase && oneNumber && oneSpecialChar && passwordLength) {
      strongPassword = true;
    }

    this.setState({
      strongPassword: strongPassword,
      oneLowercase: oneLowercase,
      oneUppercase: oneUppercase,
      oneNumber: oneNumber,
      oneSpecialChar: oneSpecialChar,
      passwordLength: passwordLength,
    });

  }

  handleInputChange(e) {
    this.props.changePasswordValue(e.target.name, e.target.value);
    // Just for re-render
    this.setState({
      editing: true
    });
  }

  initialState() {
    this.setState({
      strongPassword: true,
      oneLowercase: true,
      oneUppercase: true,
      oneNumber: true,
      oneSpecialChar: true,
      passwordLength: true,
    });
  }

  updatePassword(e) {
    e.preventDefault();
    const newPasswordInfo = this.props.password;
    if (this.state.strongPassword) {
      this.props.updatePasswordById(newPasswordInfo.id, newPasswordInfo, () => {
        // Hide modal
        this.props.onHide();

        window.$swal({
          title: 'Nice!',
          text: 'Your password has been updated',
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
          <Modal.Title id="contained-modal-title-lg">Edit a Password</Modal.Title>
        </Modal.Header>
        <form onSubmit={ this.updatePassword } method="post">
          <Modal.Body>
            <PasswordFields
              newPassword={ this.props.password }
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
)(EditPasswordModal);
