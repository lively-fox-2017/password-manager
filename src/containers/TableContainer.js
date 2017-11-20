import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchAccounts, fetchDeleteAccount, loadAccount} from '../actions/AccountActions'

class TableContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      search: ''
    }
    this.props.fetchAccounts()
  }

  deleteAccount(id) {
    this.props.fetchDeleteAccount(id)
  }

  updateForm(id) {
    this.props.loadAccount(id)
  }

  computeAccounts = () => {
    if (this.state.search !== '') {
      return this.props.accounts.filter(element => {
        const matchUrl = (element.url.indexOf(this.state.search) !== -1) ? true : false
        const matchUsername = (element.username.indexOf(this.state.search) !== -1) ? true : false
        return matchUrl || matchUsername
      })
    } else {
      return this.props.accounts
    }
  }

  generateRows = () => {
    const accounts = this.computeAccounts()
    const rows = accounts.map((element, index) => {
      return (<tr key={index}>
        <td>{index + 1}</td>
        <td>{element.url}</td>
        <td>{element.username}</td>
        <td>
          <fieldset className="form-group">
            <button className="btn btn-secondary" type="button" onClick={() => this.updateForm(element.id)}>Edit</button>&nbsp;
            <button className="btn btn-danger" type="button" onClick={() => this.deleteAccount(element.id)}>Delete</button>
          </fieldset>
        </td>
      </tr>)
    })
    return rows
  }

  searchHandler = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  render() {
    return (<div>
      <div className="row bottom-buffer">
        <div className="col-md-4">
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" onChange={(e) => this.searchHandler(e)} />
          </form>
        </div>
      </div>
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
    </div>);
  }

}

const mapStateToProps = (state) => ({accounts: state.accountReducer.accounts});

const mapDispatchToProps = (dispatch) => ({
  fetchAccounts: () => dispatch(fetchAccounts()),
  fetchDeleteAccount: (id) => dispatch(fetchDeleteAccount(id)),
  loadAccount: (id) => dispatch(loadAccount(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
