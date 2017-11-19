import { ADD_USER, GET_USERS, DELETE_USER, SET_UPDATE, UPDATE_USER } from '../actions/UserAction'
import { combineReducers } from 'redux'
const UserState = {
  Users: [],
  btn_update: false,
  id: '', 
  inputUser: {
    url: '',
    username: '',
    password: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }
}
const UserReduce = (state = UserState, action) => {
  switch(action.type) {
    case ADD_USER:
      let newUsers = []
      let newUser = state.Users.map(i => {newUsers.push(i)})
      newUsers.push(action.inputUser)
      state.inputUser = {
        url: '',
        username: '',
        password: '',
        createdAt: new Date(),
        updatedAt: new Date()      
      }
      return {...state, Users: newUsers }
    case SET_UPDATE:
      let setUser = {
        url: action.user.url,
        username: action.user.username,
        password: action.user.password,
        createdAt: action.user.createdAt,
        updatedAt: action.user.updatedAt      
      }
      state.id = action.user.id
      state.btn_update = true
      console.log(state)
      return {...state, inputUser: setUser}
    case UPDATE_USER:
      let updateUser = {
        url: '',
        username: '',
        password: '',
        createdAt: new Date(),
        updatedAt: new Date()      
      }
      let updateAllUsers = []
      state.Users.map(val => {
        if(val.id == action.user.id) {
          updateAllUsers.push(action.user)
        } else {
          updateAllUsers.push(val)
        }
      })
      console.log(updateAllUsers,'Update')
      return {...state, Users: updateAllUsers, inputUser: updateUser, id: '', btn_update:false}
    case DELETE_USER:
      let updateDeleteUser = []
      state.Users.map(i => {
        if(i.id != action.id) { updateDeleteUser.push(i)}
      })
      return {...state, Users: updateDeleteUser}
    case GET_USERS:
      return {...state, Users: action.allUser}
    default:
      return state
  }
}
const User = combineReducers({ UserReduce })
export default User