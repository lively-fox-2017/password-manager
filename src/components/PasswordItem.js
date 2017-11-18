import React, { Component } from 'react';

class PasswordItem extends Component {
  render() {
    const password = this.props.password;
    return (
      <tr>
        <td>{ password.url }</td>
        <td>{ password.username }</td>
        <td>{ password.password }</td>
        <td>{ password.created_at }</td>
        <td>{ password.updated_at }</td>
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
