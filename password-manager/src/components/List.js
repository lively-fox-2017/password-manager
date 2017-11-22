import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { getUserData } from '../actions/userAction'

class List extends Component {
  fetchUser () {
    axios.get('http://localhost:3000/users')
    .then(({ data }) => {
      console.log('hasil data ---> 1 ', data);
      this.props.getUserData(data)
    })
    .catch((err) => {
      console.error(err);
    })
  }

  componentWillMount () {
    this.fetchUser()
  }


  render() {
    return (
      <div className="container">
          { this.props.dataUser.map((user, index) => {
            // { console.log('----------> 5', user.username) }
            return (
              <table className="table table-condensed">
                <thead>
                  <tr>
                    <th>URL</th>
                    <th>username</th>
                    <th>Password</th>
                    <th>createdAt</th>
                    <th>updatedAt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td  key={index}>{user.url}</td>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td>{user.createdAt}</td>
                    <td>{user.updatedAt}</td>
                  </tr>
                </tbody>
              </table>
            )
          }) }

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: (data) => dispatch(getUserData(data))
  }
}

const mapStateToProps = (state) => {
  console.log(' hasil dari si state -----> 4', state.users.length);
  return {
    dataUser: state.users
  }
}

var ConnectedComponent = connect(
  mapStateToProps, mapDispatchToProps
) (List)

export default ConnectedComponent
