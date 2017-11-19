import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Notification, Delete } from 'reactbulma';
import socMedAccountFormActions from '../redux/actions/SocMedAccountForm';
import accountActions from '../redux/actions/account';
import SocMedAccountForm from '../organism/SocMedAccountForm';
import PasswordValidator from '../organism/PasswordValidator';

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
        <div className="columns is-mobile">
          <div className="column is-4 is-offset-2">
            <SocMedAccountForm clickHandler={this.storeAccount} buttonName="Add Account" buttonIcon="fa-plus" title="Add Account"/>
            <br/>
            {(this.state.isStored) &&
              <Notification primary>
                <Delete onClick={this.dismissNotif}/>
                Account succesfuly stored.
              </Notification>
            }
          </div>
          <div className="column is-4">
            <br/><br/>
            <PasswordValidator password={this.props.password}/>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    password: state.socMedAccountForm.password,
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

export default connect(mapStateToProps, mapActionsToProps)(AddAccount);
