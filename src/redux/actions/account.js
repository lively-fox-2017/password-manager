import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/';

function getAllAccount() {
  return function (dispatch) {
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

export default {
  getAllAccount,
  setAccounts,
}
