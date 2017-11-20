export const TOGGLE_SUCCESS = 'TOGGLE_SUCCESS'
export const REQUEST_API = 'REQUEST_API'
export const RECIEVE_ACCOUNTS = 'RECIEVE_ACCOUNTS'
export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS'
export const FAILED_REQUEST = 'FAILED_REQUEST'
export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT'
export const LOAD_ACCOUNT = 'LOAD_ACCOUNT'
export const FETCH_ADD_ACCOUNT = 'FETCH_ADD_ACCOUNT'
export const FETCH_DELETE_ACCOUNT = 'FETCH_DELETE_ACCOUNT'

export const toggleSuccess = () => ({
  type: TOGGLE_SUCCESS
})
export const requestAPI = () => ({
  type: REQUEST_API
})
export const recieveAccounts = (accounts) => ({
  type: RECIEVE_ACCOUNTS,
  payload: {
    accounts
  }
})
export const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: {
    error
  }
})
export const addAccount = (account) => ({
  type: ADD_ACCOUNT,
  payload: {
    account
  }
})
export const deleteAccount = id => ({
  type: DELETE_ACCOUNT,
  payload: {
    id
  }
})
export const loadAccount = id => ({
  type: LOAD_ACCOUNT,
  payload: {
    id
  }
})
export const fetchAccounts = () => ({
  type: FETCH_ACCOUNTS
})
export const fetchAddAccount = (account) => ({
  type: FETCH_ADD_ACCOUNT,
  payload: {
    account
  }
})
export const fetchDeleteAccount = (id) => ({
  type: FETCH_DELETE_ACCOUNT,
  payload: {
    id
  }
})
