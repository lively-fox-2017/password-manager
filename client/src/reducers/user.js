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
    default:
      return state
  }
}

export default userReducers
