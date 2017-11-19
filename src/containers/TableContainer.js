import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchAccounts, fetchDeleteAccount } from '../actions/AccountActions'

class TableContainer extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount () {
    this.props.fetchAccounts()
  }

  deleteAccount (id) {
    this.props.fetchDeleteAccount(id)
  }

  generateRows = () => {
    const rows = this.props.accounts.map((element, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{element.url}</td>
          <td>{element.username}</td>
          <td>
            <fieldset className="form-group">
              <button className="btn btn-secondary" type="button">Edit</button>&nbsp;
              <button className="btn btn-danger" type="button" onClick={() => this.deleteAccount(element.id)}>Delete</button>
            </fieldset>
          </td>
        </tr>
      )
    })
    return rows
  }

  render() {
    return (
      <div className="row bottom-buffer">
        <div className="col-md-12">
          <table className="table table-striped table-hover table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>URL</th>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.generateRows()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  accounts: state.accountReducer.accounts
});

const mapDispatchToProps = (dispatch) => ({
  fetchAccounts: () => dispatch(fetchAccounts()),
  fetchDeleteAccount: (id) => dispatch(fetchDeleteAccount(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
