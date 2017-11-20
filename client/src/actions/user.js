import axios from 'axios'
import { push } from 'react-router-redux'

export const fetchAllUser = (userList) => {
  return {
    type: 'FETCH_ALL',
    payload: {
      userList
    }
  }
}
export const fetchUser = (user) => {
  return {
    type: 'FETCH',
    payload: {
      user
    }
  }
}
export const changeValueForm = (formUser) => {
  // console.log('form user', formUser);
  return {
    type: 'CHANGE_VALUE_FORM',
    payload: {
      formUser
    }
  }
}
export const validatePassword = (password) => {
  return {
    type: 'VALIDATE_PASSWORD',
    payload: {
      password
    }
  }
}
export const fetchAllUserAPI = (param) => {
  return (dispatch, getState) => {
    axios.get('http://localhost:2000/users?q='+param)
    .then(({ data }) => {
      // console.log('response', data);
      dispatch(fetchAllUser(data))
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export const fetchUserByIdAPI = (id) => {
  return (dispatch, getState) => {
    axios.get('http://localhost:2000/users/'+id)
    .then(({ data }) => {
      // console.log('response', data);
      dispatch(changeValueForm(data))
    })
    .catch(err => {
      console.log(err);
    })
  }
}
export const putUserAPI = (id, formUser) => {
  // console.log('form data put', formUser);
  return (dispatch, getState) => {
    axios.put('http://localhost:2000/users/'+id, formUser)
    .then(({ data }) => {
      push('/')
      // console.log('kok gak push');
      dispatch(push('/'))
      // console.log('history', history);
      // history.push('/')
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export const addNewUserAPI = (newUser) => {
  return (dispatch, getState) => {
    axios.post('http://localhost:2000/users', newUser)
    .then(({ data }) => {
      // console.log('response', data);
      // let newUserList = getState.push(data)
      // dispatch(fetchAllUser(newUserList))
      dispatch(fetchAllUserAPI(''))
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export const deleteUserAPI = (id) => {
  return (dispatch, getState) => {
    axios.delete('http://localhost:2000/users/'+id)
    .then( ({data}) => {
      // let newUserList = getState().user.userList
      // console.log('ini list', newUserList);
      // let idx = newUserList.findIndex(list => list.id === id)
      // newUserList.splice(idx,1)
      // dispatch(fetchAllUser(newUserList))
      dispatch(fetchAllUserAPI(''))
    })
  }
}
