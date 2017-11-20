import axios from 'axios'

const baseUrl = 'http://localhost:3001/accounts'

export const setAccounts = (accounts) => {
  return {
    type: 'GET_ALL',
    payload: {
      accounts
    }
  }
}

export const setSingleAccount = (account) => {
  return {
    type: 'SET_ACCOUNT',
    payload: {
      account
    }
  }
}

export const setShowedAccounts = (accounts) => {
  return {
    type: 'SHOW_DATA',
    payload: {
      accounts
    }
  }
}

export const getAllAccounts = () => {
  return (dispatch, getState) => {
    axios.get(baseUrl).then((response) => {
      dispatch(setAccounts(response.data))
      dispatch(showedAccounts(''))
    }).catch((err) => {
      console.error(err)
    })
  }
}

export const showedAccounts = (search) => {
  return (dispatch, getState) => {
    var filteredData = []
    getState().accountsReducer.accounts.findIndex(acc => {
      if (acc.url.indexOf(search) > -1 || acc.username.indexOf(search) > -1 || acc.password.toLowerCase().indexOf(search.toLowerCase()) > -1) {
        filteredData.push(acc)
      }
    })
    return dispatch(setShowedAccounts(filteredData))
  }
}

export const getById = (id) => {
  return (dispatch, getState) => {
    var index = getState().accountsReducer.accounts.findIndex(acc => {
      if(acc.id === parseInt(id)) {
        return acc
      }
    })
    return dispatch(setSingleAccount(getState().accountsReducer.accounts[index]))
  }
}

export const create = (data) => {
  return (dispatch, getState) => {
    data.created_at = new Date(Date.now()).toISOString()
    axios.post(baseUrl, data).then((response) => {
      var accounts = getState().accountsReducer.accounts
      accounts.push(response.data)
      dispatch(setAccounts(accounts))
      dispatch(showedAccounts(''))
    }).catch((err) => {
      console.error(err)
    })
  }
}

export const update = (data) => {
  return (dispatch, getState) => {
    data.created_at = getState().accountsReducer.account.created_at
    data.updated_at = new Date(Date.now()).toISOString()
    axios.put(baseUrl + '/' + data.id, data).then((response) => {
      var accounts = getState().accountsReducer.accounts
      var index = getState().accountsReducer.accounts.findIndex(acc => {
        if(acc.id === parseInt(data.id)) {
          return acc
        }
      })
      accounts[index] = response.data
      dispatch(setAccounts(accounts))
      dispatch(showedAccounts(''))
    }).catch((err) => {
      console.error(err)
    })
  }
}

export const destroy = (id) => {
  return (dispatch, getState) => {
    axios.delete(baseUrl+'/'+id).then((response) => {
      var index = getState().accountsReducer.accounts.findIndex(acc => {
        if (acc.id === parseInt(id)) {
          return acc
        }
      })
      var accounts = getState().accountsReducer.accounts
      accounts.splice(index, 1)
      dispatch(setAccounts(accounts))
      dispatch(showedAccounts(''))
    }).catch((err) => {
      console.error(err)
    })
  }
}
