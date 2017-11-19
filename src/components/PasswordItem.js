import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  deletePasswordById
} from '../actions/passwordActions';

const mapDispatchToProps = (dispatch) => {
  return {
    deletePasswordById: (id, callback) => dispatch(deletePasswordById(id, callback))
  }
};

class PasswordItem extends Component {
  deletePassword(id) {
    window
      .$swal('Are you sure you want to delete this password?', {
        buttons: {
          cancel: 'Cancel',
          delete: true,
        },
      })
      .then((value) => {
        switch (value) {
          case "delete":
            this.props.deletePasswordById(id, () => {
              window.$swal({
                title: 'Deleted!',
                text: 'Password has been deleted',
                icon: 'success',
              });
            });
            break;
        }
      });


  }

  render() {
    const password = this.props.password;
    const createdAt = new Date(password.created_at).toLocaleString();
    const updatedAt = password.updated_at ?
                      new Date(password.updated_at).toLocaleString() :
                      '';
    return (
      <tr>
        <td>{ password.url }</td>
        <td>{ password.username }</td>
        <td>{ password.password }</td>
        <td>{ createdAt }</td>
        <td>{ updatedAt }</td>
        <td>
          <button className="btn btn-warning btn-sm">
            <span className="glyphicon glyphicon-pencil"></span>
          </button>
          &nbsp;
          <button className="btn btn-danger btn-sm" onClick={ () => this.deletePassword(password.id) }>
            <span className="glyphicon glyphicon-trash"></span>
          </button>
        </td>
      </tr>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(PasswordItem);
