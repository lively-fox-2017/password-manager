import axios from 'axios'

export const ADD_USER = 'ADD_USER'
export const SET_UPDATE = 'SET_UPDATE'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'
export const GET_USERS = 'GET_USERS'

export const addUser = inputUser => {
  return {
    type: ADD_USER,
    inputUser
  }
}
export const getUsers = allUser => {
  return {
    type: GET_USERS,
    allUser  
  }
}
export const setUpdate = user => {
  return {
    type: SET_UPDATE,
    user
  }
}
export const updateUser = user => {
  return {
    type: UPDATE_USER,
    user  
  }
}
export const deleteUser = id => {
  return {
    type: DELETE_USER,
    id  
  }
}
export const addUserAPI = (inputUser) => {
  return (dispatch, getState) => {
    axios.post('http://localhost:3000/user', inputUser)
    .then(({data}) => {
      console.log('==========ADD USER')
      dispatch(addUser(data))
    })
  }
}
export const getUsersAPI = () => {
  return (dispatch, getState) => {
    axios.get('http://localhost:3000/user')
    .then(({data}) => {
      console.log('==========GET USERS')
      dispatch(getUsers(data))
    })
  }
}
export const getUserAPI = (id) => {
  return (dispatch, getState) => {
    axios.get('http://localhost:3000/user/' + id)
    .then(({data}) => {
      console.log('==========GET USER')
      dispatch(setUpdate(data))
    })
  }
}
export const updateUserAPI = (id, input) => {
  return (dispatch, getState) => {
    input['updatedAt'] = new Date()
    axios.put('http://localhost:3000/user/' + id, input)
    .then(({data}) => {
      console.log('==========UPDATE USER', data)
      dispatch(updateUser(data))
    })
  }
}
export const deleteUserAPI = (id) => {
  return (dispatch, getState) => {
    axios.delete('http://localhost:3000/user/' + id)
    .then(({data}) => {
      console.log('==========DELETE USER')
      dispatch(deleteUser(id))
    })
  }
}
