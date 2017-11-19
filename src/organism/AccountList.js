import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Panel, Control, Icon, Input, Table, Button } from 'reactbulma';
import accountActions from '../redux/actions/account'
import socMedAccountFormActions from '../redux/actions/SocMedAccountForm';

class AccountList extends Component {
  constructor(props) {
    super(props);
  }

  editAction() {

  }

  accountSetup() {
    const template = []
    for (const account of this.props.accounts) {
      template.push((
        <Table.Tr key={account.id}>
          <Table.Td>{account.url}</Table.Td>
          <Table.Td>{account.username}</Table.Td>
          <Table.Td>{account.password}</Table.Td>
          <Table.Td>{account.createdAt}</Table.Td>
          <Table.Td>{account.updatedAt}</Table.Td>
          <Table.Td onClick={()=>{this.props.populateForm(account.username, account.password, account.url)}}><Link to={{pathname: `/edit-account/${account.id}`, createdAt: account.createdAt}} params={{ createdAt: account.createdAt }}><Button primary inverted><i className="fa fa-pencil" aria-hidden="true">Edit</i></Button></Link></Table.Td>
          <Table.Td onClick={()=>{this.props.deleteAccount(account.id)}}><Button danger inverted><i className="fa fa-trash-o" aria-hidden="true">Delete</i></Button></Table.Td>
        </Table.Tr>
      ))
    }
    return template;
  }

  componentDidMount() {
    this.accountSetup()
  }

  componentDidUpdate() {
    this.accountSetup();
  }

  render() {
    return (
      <Panel>
        <Panel.Heading>
          Account List
        </Panel.Heading>

        <Panel.Block>
         <Control hasIconsLeft>
           <Input small type="text" placeholder="Search"/>
           <Icon small left>
             <i className="fa fa-search"/>
           </Icon>
         </Control>
       </Panel.Block>
       <Link to="/add-account"><i className="fa fa-plus" aria-hidden="true">Add Account</i></Link>
       <Panel.Block>


        <Table striped>
          <Table.Body>
            <Table.Tr>
              <Table.Th>Website</Table.Th>
              <Table.Th>Username</Table.Th>
              <Table.Th>Password</Table.Th>
              <Table.Th>Created</Table.Th>
              <Table.Th>Updated</Table.Th>
            </Table.Tr>
            {this.accountSetup()}
          </Table.Body>
        </Table>
       </Panel.Block>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.account.accounts,
  }
}

function mapActionsToProps(dispatch) {
  return {
    deleteAccount: (id) => {
      dispatch(accountActions.deleteAccount(id));
    },
    populateForm: (username, password, url) => {
      dispatch(socMedAccountFormActions.populateToEdit(username, password, url));
    }
  }
}

const mappedAccountList = connect(mapStateToProps, mapActionsToProps)(AccountList)

export default mappedAccountList;
