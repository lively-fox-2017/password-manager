import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import PasswordList from './PasswordList'
import PasswordForm from './PasswordForm'
import { connect } from 'react-redux'

import { getById } from '../actions/accountsAction'

class Main extends React.Component {
  fetchSingleData (id) {
    this.props.getById(id)
    return this.props.account
  }
  render () {
    return (
      <div>
        <PasswordList/>
        <Route exact path="/" render={() => <PasswordForm isEdit={false} account={{url:'', username:'', password:''}}></PasswordForm>}/>
        <Route path="/edit/:id" render={(props) => <PasswordForm isEdit={true} id={props.match.params.id} account={this.fetchSingleData(props.match.params.id)}></PasswordForm>}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getById: (id) => dispatch(getById(id))
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.accountsReducer.account
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
