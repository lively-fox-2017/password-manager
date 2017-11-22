import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import PasswordList from './PasswordList'
import PasswordForm from './PasswordForm'
import { connect } from 'react-redux'

import { getById, create, update } from '../actions/accountsAction'

class Main extends React.Component {
  fetchSingleData (id) {
    this.props.getById(id)
    return this.props.account
  }
  doSubmit (values) {
    var datum = {
      url: values.url,
      password: values.password,
      username: values.username
    }
    this.props.create(datum)
  }
  doUpdate (values, id) {
    var datum = {
      id: id,
      url: values.url,
      password: values.password,
      username: values.username
    }
    this.props.update(datum)
  }
  render () {
    return (
      <div>
        <PasswordList/>
        <Route exact path="/" render={() => <PasswordForm isEdit={false}></PasswordForm>}/>
        <Route path="/edit/:id" render={(props) => <PasswordForm isEdit={true} id={props.match.params.id}></PasswordForm>}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    create: (data) => dispatch(create(data)),
    getById: (id) => dispatch(getById(id)),
    update: (data) => dispatch(update(data))
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.accountsReducer.account
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
