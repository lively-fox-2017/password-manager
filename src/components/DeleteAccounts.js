import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { destroy } from '../actions/accountsAction'

class DeleteAccounts extends React.Component {
  componentWillMount () {
    this.props.destroy(this.props.match.params.id)
  }
  render() {
    return <Redirect push to="/"/>
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    destroy: (id) => dispatch(destroy(id))
  }
}

export default connect(null, mapDispatchToProps)(DeleteAccounts)
