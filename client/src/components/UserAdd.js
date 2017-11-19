import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNewUserAPI } from '../actions/user'
import chance from 'chance'
// import { fetchAllUserAPI } from '../actions/user'
const createId = new chance()

class UserAdd extends Component {
  constructor(props){
    super(props)
    this.state = {
      formUser:{
        id: '',
        url: '',
        username: '',
        password: '',
        // createdAt: '',
        // updatedAt: ''
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    let state = this.state.formUser
    state[e.target.name] = e.target.value
    this.setState(state)
  }
  setBlankForm(){
    this.setState.formUser = {
      id:'',
      url:'',
      username:'',
      password:''
    }
  }
  addNewUser(){
    let newFromUser = this.state.formUser
    newFromUser.id = createId.guid()
    // this.state.formUser.createdAt = new Date
    // this.state.formUser.updatedAt = new Date
    this.props.addNewUserAPI(newFromUser)
    // .then(() => this.setBlankForm())
    // .catch(err=>console.log(err))

  }
  render(){
    return(
      <div className="container">
        <h1 align="center">Add User</h1>
        <div className="form" style={{width: 300}}>
          <div className="form-group">
            <label>URL</label>
            <input onChange={this.handleChange} className="form-control" name="url" type="text" placeholder="Type your URL"/>
          </div>
          <div className="form-group">
            <label>Username</label>
            <input onChange={this.handleChange} className="form-control" name="username" type="text" placeholder="Type your username"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input onChange={this.handleChange} className="form-control" name="password" type="password" placeholder="Type your password"/>
          </div>
          <button onClick={() => this.addNewUser()} className="btn btn-primary">Add Data</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('asdfasdfasd1231');
  return {
    formUser: state.user.formUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addNewUserAPI : (newUser) => dispatch(addNewUserAPI(newUser))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserAdd)


// export default UserAdd
