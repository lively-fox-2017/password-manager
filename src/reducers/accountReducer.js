import {REQUEST_API, RECIEVE_ACCOUNTS, FAILED_REQUEST, ADD_ACCOUNT, DELETE_ACCOUNT, UPDATE_ACCOUNT, LOAD_ACCOUNT, TOGGLE_SUCCESS, RESET_CURRENT_ACCOUNT} from '../actions/AccountActions'
const defaultState = {
  isRequesting: false,
  isError: false,
  isSuccess: false,
  error: '',
  accounts: [],
  currentAccount: null
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
        accounts: [...state.accounts, action.payload.account],
        isError: false,
        isSuccess: true
      }
    case UPDATE_ACCOUNT:
      const idxUpdate = state.accounts.findIndex(element => element.id === action.payload.account.id)
      return {
        ...state,
        isRequesting: false,
        accounts: [...state.accounts.slice(0, idxUpdate), action.payload.account, ...state.accounts.slice(idxUpdate + 1)],
        isError: false,
        isSuccess: true
      }
    case DELETE_ACCOUNT:
      const idx = state.accounts.findIndex(element => element.id === action.payload.id)
      return {
        ...state,
        accounts: [...state.accounts.slice(0, idx), ...state.accounts.slice(idx + 1)]
      }
    case LOAD_ACCOUNT:
      const loaded = state.accounts.filter(element => element.id === action.payload.id)
      return {
        ...state,
        currentAccount: loaded[0]
      }
    case RESET_CURRENT_ACCOUNT:
      return {
        ...state,
        currentAccount: null
      }
    default:
      return state
  }
}

export default accountReducer
