import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Notification, Delete } from 'reactbulma';
import socMedAccountFormActions from '../redux/actions/SocMedAccountForm';
import accountActions from '../redux/actions/account';
import SocMedAccountForm from '../organism/SocMedAccountForm';

class AddAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStored: false,
    }
    this.storeAccount = this.storeAccount.bind(this);
    this.dismissNotif = this.dismissNotif.bind(this);
  }

  storeAccount(username, password, url) {
    this.props.storeAccount(username, password, url);
    this.props.clearForms();
    this.setState({isStored: true});
  }

  componentDidMount() {
    this.props.clearForms();
  }

  dismissNotif() {
    this.setState({isStored: false});
  }

  render() {
    return (
      <div>
        <div class="columns is-mobile">
          <div class="column is-4 is-offset-4">
            <SocMedAccountForm clickHandler={this.storeAccount} buttonName="Add Account" buttonIcon="fa-plus" title="Add Account"/>
            <br/>
            {(this.state.isStored) &&
              <Notification primary>
                <Delete onClick={this.dismissNotif}/>
                Account succesfuly stored.
              </Notification>
            }
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
    storeAccount: (username, password, url) => {
      return dispatch(accountActions.storeAccount({username, password, url}))
    }
  }
}

export default connect(null, mapActionsToProps)(AddAccount);
