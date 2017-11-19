import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactbulma';
import SocMedAccountForm from '../organism/SocMedAccountForm';
import socMedAccountFormActions from '../redux/actions/SocMedAccountForm';
import accountActions from '../redux/actions/account';

class AddAccount extends Component {
  constructor(props) {
    super(props);
    this.updateAccount = this.updateAccount.bind(this)
  }

  updateAccount(username, password, url) {
    const id = this.props.match.params.id;
    const createdAt = this.props.location.createdAt;
    this.props.updateAccount(id, username, password, url, createdAt)
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div class="columns is-mobile">
          <div class="column is-4 is-offset-4">
            <SocMedAccountForm clickHandler={this.updateAccount} buttonName="Save" buttonIcon="fa-pencil" title="Edit Account"/>
          </div>
        </div>
      </div>
    )
  }
}

function mapActionsToProps(dispatch) {
  return {
    clearForms: () => {
      return dispatch(socMedAccountFormActions.clearAll());
    },
    updateAccount: (id, username, password, url, createdAt) => {
      return dispatch(accountActions.updateAccount(id ,{username, password, url, createdAt}))
    }
  }
}

export default connect(null, mapActionsToProps)(AddAccount);
