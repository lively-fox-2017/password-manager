import React, { Component } from 'react';
import { Panel, Control, Icon, Input, Table } from 'reactbulma';

class AccountList extends Component {
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

       <Panel.Block>
        <i class="fa fa-plus" aria-hidden="true">Add</i>

        <Table striped>
          <Table.Body>
            <Table.Tr>
              <Table.Th>Website</Table.Th>
              <Table.Th>Username</Table.Th>
              <Table.Th>Password</Table.Th>
              <Table.Th>Created</Table.Th>
              <Table.Th>Updated</Table.Th>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Facebook.com</Table.Td>
              <Table.Td>NNcrawler</Table.Td>
              <Table.Td>NNcrawler</Table.Td>
              <Table.Td>Created At</Table.Td>
              <Table.Td>Updated At</Table.Td>
              <Table.Td><i class="fa fa-pencil" aria-hidden="true">Edit</i></Table.Td>
              <Table.Td><i class="fa fa-trash-o" aria-hidden="true">Delete</i></Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Facebook.com</Table.Td>
              <Table.Td>NNcrawler</Table.Td>
              <Table.Td>NNcrawler</Table.Td>
              <Table.Td>Created At</Table.Td>
              <Table.Td>Updated At</Table.Td>
              <Table.Td><i class="fa fa-pencil" aria-hidden="true">Edit</i></Table.Td>
              <Table.Td><i class="fa fa-trash-o" aria-hidden="true">Delete</i></Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Facebook.com</Table.Td>
              <Table.Td>NNcrawler</Table.Td>
              <Table.Td>NNcrawler</Table.Td>
              <Table.Td>Created</Table.Td>
              <Table.Td>Updated</Table.Td>
              <Table.Td><i class="fa fa-pencil" aria-hidden="true">Edit</i></Table.Td>
              <Table.Td><i class="fa fa-trash-o" aria-hidden="true">Delete</i></Table.Td>
            </Table.Tr>
          </Table.Body>
        </Table>
       </Panel.Block>
      </Panel>
    )
  }
}

export default AccountList;
