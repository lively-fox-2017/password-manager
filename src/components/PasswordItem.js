import React, { Component } from 'react';

class PasswordItem extends Component {
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
          <button className="btn btn-danger btn-sm">
            <span className="glyphicon glyphicon-trash"></span>
          </button>
        </td>
      </tr>
    );
  }
}

export default PasswordItem;
