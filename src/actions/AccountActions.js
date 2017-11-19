import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3003/accounts'
})

export const REQUEST_ACCOUNTS = 'REQUEST_ACCOUNTS'
const requestAccounts = () => ({
  type: REQUEST_ACCOUNTS
})

export const RECIEVE_ACCOUNT = 'RECIEVE_ACCOUNT'
const recieveAccounts = (accounts) => {
  type: RECIEVE_ACCOUNT,
  payload: {
    accounts
  }
}

export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS'
export const fetchAccounts = () => {
  return dispatch => {
    dispatch(requestAccount())

    http.get()
      .then(({data}) => dispatch(recieveAccounts(data)))
      .catch(reason => err)
  }
}
