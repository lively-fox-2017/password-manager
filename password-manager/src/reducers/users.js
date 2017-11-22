// const db require '../../db/info.json'
const db = {
  users: []
}

const reducer = (state = db, action) => {
  switch (action.type) {
    case 'DATA_GETUSER':
      console.log('---------> 3', action.payload.usersData);
      return { ...state, users: action.payload.usersData }
    default:
      return state
  }
}

export default reducer
