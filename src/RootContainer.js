import React from 'react'
import { connect } from 'react-redux'

import { getAllAccounts, deleteAccount, editAccount } from './actions/managerAction'

import InputForm from './InputForm'
import loading from './images/loading.gif'
import searchIcon from './images/search.png'
import trueImg from './images/true.png'
import falseImg from './images/false.png'

export class RootContainer extends React.Component{
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
      },
      search: '',
      errors: []
    }
  }

  componentWillMount () {
    this.props.Accounts()
  }

  handleDelete(accountId) {
    // console.log(accountId);
    this.props.DeleteAccount(accountId)
  }

  passStrength(password) {
    this.setState({
       errors: [
         {
           status: false,
           text: 'Password should contain atleast 1 Uppercase character'
         },
         {
           status: false,
           text: 'Password should contain atleast 1 Lowercase character'
         },
         {
           status: false,
           text: 'Password should contain atleast 1 Special Character (#$@!&%^*-+?)'
         },
         {
           status: false,
           text: 'Password should contain atleast 1 Number'
         },
         {
           status: false,
           text: 'Password length should more that 5 character'
         }
       ]
     })

     const upperCase = /[A-Z]/
     const lowerCase = /[a-z]/
     const specialChar = /[#$@!&%^*-+)]/
     const number = /\d/
     const passwordAuth = password.split("")

     if (passwordAuth.length >= 5) {
       this.setState(function(state) {
         state.errors[4].status = true
       })
     }

     passwordAuth.map((chr) => {
       if (upperCase.test(chr)) {
         return (
           this.setState(function(state) {
             state.errors[0].status = true
           })
         )
       } else if (lowerCase.test(chr)) {
         return (
           this.setState(function(state) {
             state.errors[1].status = true
           })
         )
       } else if (specialChar.test(chr)) {
         return (
           this.setState(function(state) {
             state.errors[2].status = true
           })
         )
       } else if (number.test(chr)) {
         return (
           this.setState(function(state) {
             state.errors[3].status = true
           })
         )
       }

       return chr
     })
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

    this.passStrength(this.props.accounts[index].password)
    // console.log(passwordAuth);
  }

  handleInput = (e) => {
    let state = this.state.account
    state[e.target.name] = e.target.value

    this.setState(state)

    this.passStrength(this.state.account.password)
    // console.log(this.state);
  }

  handleEditAccount = (e) => {
    e.preventDefault()

    // this.state.account.updatedAt = new Date()
    // console.log(this.state.account);s
    this.props.EditAccount(this.state.account.id, this.state.account)

    document.getElementById('close').click()
  }

  handleSearch = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  render() {
    const { url, username, password } = this.state.account
    const searchPassword = this.props.accounts.filter(
      (account) => {
        // console.log(this.state.search);
        return account.password.indexOf(this.state.search) !== -1
      }
    )
    return (
      <div>
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-addon"><img src={searchIcon} alt="search icon" style={{"width": 25+"px"}} /></span>
            <input className="form-control" type="text" value={this.state.search} onChange={ this.handleSearch } />
          </div>
        </div>

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
            searchPassword.map((account, index) => {
              return (
                <tr className="success" key={index}>
                  <td>{ index+1 }.</td>
                  <td><a href={ account.url } target="_blank">{ account.url } </a></td>
                  <td>{ account.username }</td>
                  <td>{ account.password }</td>
                  <td>{ account.createdAt.split("T")[0].split("-").reverse().join("/") }</td>
                  <td>{ account.updatedAt.split("T")[0].split("-").reverse().join("/") }</td>
                  <td>
                    <button className="btn btn-primary" id="editButton" onClick={ () => this.handleSetState(index) } data-toggle="modal" data-target="#MyModal">Edit</button>
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
                <form id="editForm" onSubmit={ this.handleEditAccount }>
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
                    <h6>Password Strength :</h6>
                    <table className="col-md-offset-5" style={{"marginBottom": 20+"px"}}>
                      <tbody>
                      { this.state.errors.map((error, index) => {
                        return (
                          <tr key={index}>
                            {error.status ?
                            <td style={{"paddingRight": 10+"px"}}><img src={ trueImg } alt='' width="25px" /></td> :
                            <td style={{"paddingRight": 10+"px"}}><img src={ falseImg } alt='' width="25px" /></td>
                            }
                            <td className = "text-left">{ error.text }</td>
                          </tr>
                        )
                      }) }
                      </tbody>
                    </table>
                  </div>
                  <div className="form-group">
                    <div className="col-md-12 text-center">
                      <button type="submit" className="btn btn-primary">Edit</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" id="close" className="btn btn-default" data-dismiss="modal">Close</button>
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
