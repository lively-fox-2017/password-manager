export const REQUEST_ACCOUNTS = 'REQUEST_ACCOUNTS'
export const RECIEVE_ACCOUNTS = 'RECIEVE_ACCOUNTS'
export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS'
export const FAILED_REQUEST = 'FAILED_REQUEST'

export const requestAccounts = () => ({
  type: REQUEST_ACCOUNTS
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
export const fetchAccounts = () => ({
  type: FETCH_ACCOUNTS
})
