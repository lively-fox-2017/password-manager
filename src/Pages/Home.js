import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../Templates/Home';
import accountCrud from '../redux/actions/account';
import store from '../redux/store';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAccount();
  }

  render() {
    return (
      <div>
        <Home accounts={this.props.accounts}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.account.accounts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAccount: ()=>{
      dispatch(accountCrud.getAllAccount());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
