import React from 'react'
import { connect } from 'react-redux'

import { getAllAccounts, deleteAccount, editAccount } from './actions/managerAction'

import InputForm from './InputForm'
import Search from './Search'
import loading from './images/loading.gif'

class RootContainer extends React.Component{
  constructor() {
    super()
    this.state = {
      account: {
        id: '',
        url: '',
        username: '',
        password: '',
        createdAt: '',
        updatedAt: ''
      }
    }
  }

  componentWillMount () {
    this.props.Accounts()
  }

  handleDelete(accountId) {
    // console.log(accountId);
    this.props.DeleteAccount(accountId)
  }

  handleSetState = (index) => {
    // yang di state ikut kerubah
    // let account = this.props.accounts[index]
    //
    // this.setState({
    //   account: account
    // })

    this.setState({
      account: {
        id: this.props.accounts[index].id,
        url: this.props.accounts[index].url,
        username: this.props.accounts[index].username,
        password: this.props.accounts[index].password,
        createdAt: this.props.accounts[index].createdAt,
        updatedAt: new Date()
      }
    })
  }

  handleInput = (e) => {
    let state = this.state.account
    state[e.target.name] = e.target.value

    this.setState(state)

    // console.log(this.state);
  }

  handleEditAccount = (e) => {
    e.preventDefault()

    // this.state.account.updatedAt = new Date()
    // console.log(this.state.account);s
    this.props.EditAccount(this.state.account.id, this.state.account)
  }

  render() {
    const { url, username, password } = this.state.account
    return (
      <div>
        <Search />

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="text-center">No</th>
              <th className="text-center">URL</th>
              <th className="text-center">Username</th>
              <th className="text-center">Password</th>
              <th className="text-center">Created At</th>
              <th className="text-center">Updated At</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
          { this.props.accounts.length === 0 ? <tr><td colSpan="7" className="text-center"><img src={loading} alt="loading.." style={{"width":100+"px"}} /></td></tr> :
            this.props.accounts.map((account, index) => {
              return (
                <tr className="success" key={index}>
                  <td>{ index+1 }.</td>
                  <td>{ account.url }</td>
                  <td>{ account.username }</td>
                  <td>{ account.password }</td>
                  <td>{ account.createdAt.split("T")[0].split("-").reverse().join("/") }</td>
                  <td>{ account.updatedAt.split("T")[0].split("-").reverse().join("/") }</td>
                  <td>
                    <button className="btn btn-primary" onClick={ () => this.handleSetState(index) } data-toggle="modal" data-target="#MyModal">Edit</button>
                    <button className="btn btn-danger" onClick={ () => this.handleDelete(account.id) }>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table> <br />

        <div id="MyModal" className="modal fade" role="dialog">
          <div className="modal-dialog">

            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Edit Account</h4>
              </div>
              <div className="modal-body">
                <form onSubmit={ this.handleEditAccount }>
                  <h3>Input Form</h3><br />
                  <div className="form-group has-success">
                    <label className="control-label" htmlFor="inputSuccess">URL</label>
                    <input className="form-control text-center" id="inputSuccess" name="url" type="text" value={ url } onChange={ this.handleInput } required />
                  </div>
                  <div className="form-group has-success">
                    <label className="control-label" htmlFor="inputSuccess">Username</label>
                    <input className="form-control text-center" id="inputSuccess" name="username" type="text" value={ username } onChange={ this.handleInput } required />
                  </div>
                  <div className="form-group has-success">
                    <label className="control-label" htmlFor="inputSuccess">Password</label>
                    <input className="form-control text-center" id="inputSuccess" name="password" type="password" value={ password } onChange={ this.handleInput } required />
                  </div>
                  <div className="form-group">
                    <div className="col-md-12 text-center">
                      <button type="submit" className="btn btn-primary">Edit</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>

          </div>
        </div>

        <InputForm />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log("------------> ", state.managerReducer.Accounts);
  return {
    accounts: state.managerReducer.Accounts
  }
}

const mapDispatchToProps = (dispatch) => ({
  Accounts: () => dispatch(getAllAccounts()),
  DeleteAccount: (accountId) => dispatch(deleteAccount(accountId)),
  EditAccount: (accountId, account) => dispatch(editAccount(accountId, account))
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
