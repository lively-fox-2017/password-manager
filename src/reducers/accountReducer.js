import { REQUEST_ACCOUNTS, RECIEVE_ACCOUNTS, FAILED_REQUEST } from '../actions/AccountActions'
const defaultState = {
  isRequesting: false,
  isError: false,
  error: '',
  accounts: []
}

const accountReducer = (state=defaultState, action) => {
  switch (action.type) {
    case REQUEST_ACCOUNTS:
      return {...state, isRequesting: true}
    case RECIEVE_ACCOUNTS:
      return {...state, isRequesting: false, accounts: action.payload.accounts, isError: false}
    case FAILED_REQUEST:
      return {...state, error: action.payload.error, isError: true}
    default:
      return state
  }
}

export default accountReducer
