import React, { Component } from 'react'
import { connect } from 'react-redux'
import { putUserAPI, fetchUserByIdAPI, changeValueForm } from '../actions/user'
import { Redirect } from 'react-router'

class UserEdit extends Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    let state = this.props.formUser
    state[e.target.name] = e.target.value
    this.setState(state)
  }
  componentWillMount(){
    // console.log('cek id', this.props.match.params.id);
    this.props.fetchUserById(this.props.match.params.id);
  }
  editUser(){
    let newFromUser = this.props.formUser
    newFromUser.updatedAt = new Date()
    console.log(newFromUser);
    this.props.putUser(newFromUser.id, newFromUser)

  }
  render(){
    let formUser=this.props.formUser
    // console.log('cekkk', this.props.formUser);
    return(
      <div className="container">
        <h1 align="center">Edit Data User</h1>
        <div className="form" style={{width: 300}}>
          <div class="form-group">
            <label>URL</label>
            <input onChange={this.handleChange} value={formUser.url} className="form-control" name="url" type="text" placeholder="Type your URL"/>
          </div>
          <div class="form-group">
            <label>Username</label>
            <input onChange={this.handleChange} value={formUser.username} className="form-control" name="username" type="text" placeholder="Type your username"/>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input onChange={this.handleChange} value={formUser.password} className="form-control" name="password" type="password" placeholder="Type your password"/>
          </div>
          <button onClick={() => this.editUser()} className="btn btn-primary">Edit Data</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    formUser: state.user.formUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserById : (id) => dispatch(fetchUserByIdAPI(id)),
    putUser : (id, formUser) => dispatch(putUserAPI(id, formUser)),
    changeValueForm : (formUser) => dispatch(changeValueForm(formUser))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)


// export default UserAdd
