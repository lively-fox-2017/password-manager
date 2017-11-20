// import chance from 'chance'
const stateUser = {
  userList: [],
  formUser: {
    id: '',
    url: '',
    username: '',
    password: '',
    createdAt: '',
    updatedAt: ''
  },
  pwdContaining: {
    upperCase:false,
    lowerCase:false,
    specialCase:false,
    number:false,
    lengthMin:false
  }
}

const userReducers = (state = stateUser, action) => {
  // console.log('cek action',action.payload);
  switch (action.type) {
    case 'FETCH_ALL':
      return {
        ...state, userList: action.payload.userList
      }
    // case 'FETCH' :
    //   return {
    //     ...state, user: action.payload.user
    //   }
    case 'ADD_NEW_USER':
      let newUserList = state.userList.push(action.payload.newUser)
      return {
        ...state, userList: newUserList
      }
    case 'CHANGE_VALUE_FORM':
      return {
        ...state, formUser: action.payload.formUser
      }
    case 'VALIDATE_PASSWORD':
    return {
      ...state, pwdContaining: action.payload.password
    }
    default:
      return state
  }
}

export default userReducers
