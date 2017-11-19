import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/';

function getAllAccount() {
  return function(dispatch) {
    axios.get('/account')
    .then(({ data }) => (dispatch(setAccounts(data))));
  }
}

function setAccounts(payload) {
  return {
    type: 'SET_ACCOUNTS',
    state: {
      accounts: payload,
    },
  }
}

function storeAccount(payload) {
  const username = payload.username ? payload.username : '';
  const password = payload.password ? payload.password : '';
  const url = payload.url ? payload.url : '';
  return function(dispatch) {
    axios.post('/account', {
      createdAt: new Date().toUTCString(),
      updatedAt: '',
      username,
      password,
      url,
    })
  }
}

function deleteAccount(id) {
  return function(dispatch) {
    axios.delete(`/account/${id}`)
    .then(() => {
      dispatch(getAllAccount());
    })
  }
}

function updateAccount(id, payload) {
  const username = payload.username ? payload.username : '';
  const password = payload.password ? payload.password : '';
  const url = payload.url ? payload.url : '';
  const createdAt= payload.createdAt ? payload.createdAt : '';
  return function(dispatch) {
    axios.put(`/account/${id}`, {
      createdAt,
      updatedAt: new Date().toUTCString(),
      username,
      password,
      url,
    })
  }
}

export default {
  getAllAccount,
  setAccounts,
  storeAccount,
  deleteAccount,
  updateAccount,
}
