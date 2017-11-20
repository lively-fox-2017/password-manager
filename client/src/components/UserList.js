import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchAllUserAPI, deleteUserAPI } from '../actions/user'
import { Link } from 'react-router-dom'

class UserList extends Component{
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    this.props.fetchAllUser(e.target.value)
  }
  componentDidMount(){
    this.props.fetchAllUser('')
  }
  render(){
    return (
      <div >
        <h1 align="center">User List</h1>
        <form style={{width: 300}}>
          {/* <label>Keyword</label> */}
          <input onChange={this.handleChange} className="form-control" type="text" placeholder="type your keyword to search..."></input> <br/>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>URL</th>
              <th>Username</th>
              <th>Password</th>
              <th>CreatedAt</th>
              <th>UpdatedAt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.userList.map((user, index) => {
              let linkEdit="/users/edit/"+user.id
              return (
                <tr key={index}>
                  <td>{user.url}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.createdAt}</td>
                  <td>{user.updatedAt}</td>
                  <td>
                    <Link to={linkEdit}>Edit</Link> |
                    <Link to="" onClick={()=>this.props.deleteUser(user.id)}> Delete</Link>
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
const mapStateToProps = (state) => {
  // console.log('ini mapStateToProps', state);
  return {
    userList: state.user.userList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUser : (param) => dispatch(fetchAllUserAPI(param)),
    deleteUser : (id) => dispatch(deleteUserAPI(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
// export default UserList
