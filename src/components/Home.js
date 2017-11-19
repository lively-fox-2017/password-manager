import React from 'react'
import { connect } from 'react-redux'
import User from '../reducers/UserReduce'
import { getUsersAPI, deleteUserAPI, getUserAPI } from '../actions/UserAction'
import FormUser from './FormUser'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getUsers()
  }
  render () {
    return (
      <div className="home">
        <FormUser/>
      <div className="form-group">
        <input type="text" className="form-control" id="usr" />
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>URL</th>
            <th>username</th>
            <th>Password</th>
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
            <th colSpan="2">Actions</th>
          </tr>
          </thead>
          <tbody>
              {this.props.showUsers.map(val => {
                return (
                  <tr>
                    <td>{val.url}</td>
                    <td>{val.username}</td>
                    <td>{val.password}</td>
                    <td>{val.createdAt}</td>
                    <td>{val.updatedAt}</td>
                    <td colSpan="2">
                      <button className="btn btn-failed" onClick={()=>{this.props.setUpdate(val.id)}}>Update</button>&nbsp;
                      <button className="btn btn-failed" onClick={()=>{this.props.deleteUser(val.id)}}>Delete</button>
                    </td>
                  </tr>  
                )
              })}
            </tbody>
          </table>
        </div>
    )
  }
}
const mapDispatch = (dispatch) => {
  return { 
    getUsers: () => dispatch(getUsersAPI()), 
    deleteUser:(id) => dispatch(deleteUserAPI(id)), 
    setUpdate:(id) => dispatch(getUserAPI(id))
  }
} 
const mapState = (state) => {
  return { showUsers: state.UserReduce.Users }
}
const homeConnect = connect(mapState, mapDispatch)(Home)
export default homeConnect