import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.js'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { getAllAccounts, showedAccounts } from '../actions/accountsAction'

class PasswordList extends React.Component {
  componentWillMount () {
    this.props.getAllAccounts()
  }
  _onKeyPress (e) {
    if (e.charCode === 13) {
      this.props.showedAccounts(this.refs.searchField.getValue())
    }
  }
  editData (id) {
    this.props.getById(id)
    swal({
        title: 'Input new password',
        input: 'text',
        inputPlaceholder: 'Enter your password'
    }).then((password) => {
      this.props.update({id:id, password:password.value})
    }).catch((err) => {
      console.error(err)
    })
  }
  render () {
    return (
      <div>
        <MuiThemeProvider>
          <TextField
            ref="searchField"
            floatingLabelText="Type and enter to search"
            onKeyPress={(e) => this._onKeyPress(e)}
          />
        </MuiThemeProvider>
          <br/>
        <MuiThemeProvider>
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Url</TableHeaderColumn>
                <TableHeaderColumn>Username</TableHeaderColumn>
                <TableHeaderColumn>Password</TableHeaderColumn>
                <TableHeaderColumn>Created At</TableHeaderColumn>
                <TableHeaderColumn>Updated At</TableHeaderColumn>
                <TableHeaderColumn>Action</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.accounts.map(acc => {
                return (
                  <TableRow key={acc.id}>
                    <TableRowColumn>{acc.url}</TableRowColumn>
                    <TableRowColumn>{acc.username}</TableRowColumn>
                    <TableRowColumn>{acc.password}</TableRowColumn>
                    <TableRowColumn>{acc.created_at}</TableRowColumn>
                    <TableRowColumn>{acc.updated_at}</TableRowColumn>
                    {/* <TableRowColumn><span onClick={() => this.editData(acc.id)}>Edit</span> || <Link to={'/delete/'+acc.id}>Delete</Link></TableRowColumn> */}
                    <TableRowColumn><Link to={'/edit/'+acc.id}>Edit</Link> || <Link to={'/delete/'+acc.id}>Delete</Link></TableRowColumn>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  accounts: state.accountsReducer.showedAccounts
})

const mapDispatchToProps = (dispatch) => ({
  getAllAccounts: () => dispatch(getAllAccounts()),
  showedAccounts: (search) => dispatch(showedAccounts(search))
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordList)
