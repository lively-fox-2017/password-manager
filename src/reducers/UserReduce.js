import passValidator from 'password-validator'
import { ADD_USER, GET_USERS, DELETE_USER, SET_UPDATE, UPDATE_USER, CLEAR_FORM, CEK_PAS } from '../actions/UserAction'
import { combineReducers } from 'redux'
const schema = new passValidator()
schema.is().min(6).symbols().has().lowercase().has().uppercase().digits()

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
  },
  passValid: {
    digits: 'X',
    min: 'X',
    uppercase: 'X',
    lowercase: 'X',
    symbols: 'X'
},
  valid: false
}
const UserReduce = (state = UserState, action) => {
  switch(action.type) {
    case CEK_PAS:
      let status = state.status = false
      let password = action.password
      let passValid = schema.validate(password, { list: true })    
      console.log(passValid)
      let passValidation = {
        digits: 'X',
        min: 'X',
        uppercase: 'X',
        lowercase: 'X',
        symbols: 'X'
      }
      if(passValid.length == 0){
        status = true
        passValidation = {
          digits: 'V',
          min: 'V',
          uppercase: 'V',
          lowercase: 'V',
          symbols: 'V'
        }
      } else {
        if(passValid.indexOf('symbols') == -1) {
          passValidation.symbols = 'V'          
        }
        if(passValid.indexOf('min') == -1) {
          passValidation.min = 'V'          
        }
        if(passValid.indexOf('digits') == -1) {
          passValidation.digits = 'V'          
        }
        if(passValid.indexOf('uppercase') == -1) {
          passValidation.uppercase = 'V'          
        }
        if(passValid.indexOf('lowercase') == -1) {
          passValidation.lowercase = 'V'          
        }
      }
      return {...state, passValid: passValidation, valid: status }    
    case CLEAR_FORM:
      let formClear = {
        url: '',
        username: '',
        password: '',
        createdAt: new Date(),
        updatedAt: new Date()            
      }
      return {...state, inputUser: formClear, id: '', btn_update: false }    
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