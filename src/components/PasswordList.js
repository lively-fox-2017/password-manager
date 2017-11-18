import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestPasswords } from '../actions/passwordActions';
import PasswordItem from './PasswordItem';

const mapStateToProps = (state) => ({
  passwords: state.passwordReducer.passwords,
});

const mapDispatchToProps = (dispatch) => ({
  requestPasswords: dispatch(requestPasswords()),
});

class PasswordList extends Component {
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>URL</th>
              <th>Username</th>
              <th>Password</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.passwords.map((password) => {
                return (
                  <PasswordItem password={ password } key={ password.id }/>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordList);
