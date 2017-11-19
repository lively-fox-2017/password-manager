import {REQUEST_API, RECIEVE_ACCOUNTS, FAILED_REQUEST, ADD_ACCOUNT, TOGGLE_SUCCESS} from '../actions/AccountActions'
const defaultState = {
  isRequesting: false,
  isError: false,
  isSuccess: false,
  error: '',
  accounts: []
}

const accountReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_SUCCESS:
      return {
        ...state,
        isSuccess: !state.isSuccess
      }
    case REQUEST_API:
      return {
        ...state,
        isRequesting: true,
        isSuccess: false
      }
    case RECIEVE_ACCOUNTS:
      return {
        ...state,
        isRequesting: false,
        accounts: action.payload.accounts,
        isError: false,
        isSuccess: true
      }
    case FAILED_REQUEST:
      return {
        ...state,
        error: action.payload.error,
        isError: true,
        isSuccess: false
      }
    case ADD_ACCOUNT:
      return {
        ...state,
        isRequesting: false,
        accounts: state.accounts.push(action.payload.account),
        isError: false,
        isSuccess: true
      }
    default:
      return state
  }
}

export default accountReducer
