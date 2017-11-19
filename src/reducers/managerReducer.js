const defaultState = {
  Accounts: []
}

const managerReducer = (state=defaultState, action) => {
  if (action.type === "ACCOUNT") {
    return {...state, Accounts: action.payload}
  }

  return state
}

export default managerReducer
