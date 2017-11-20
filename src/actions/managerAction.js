import axios from 'axios'

export const managerAction = (account) => {
  return {
    type: "ACCOUNT",
    payload: account
  }
}

export const getAllAccounts = () => {
  return (dispatch, getState) => {
    axios.get('http://localhost:3000/accounts')
    .then(({data}) => {
      // console.log(data);

      return dispatch(managerAction(data))
    }).catch((reason) => {
      // console.log("ERROR ", reason);
    })
  }
}

export const inputAccount = (account) => {
  return (dispatch, getState) => {
    axios.post('http://localhost:3000/accounts', account, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(({data}) => {
      // console.log(data);
      // console.log(getState().managerReducer.Accounts);
      // let accounts = getState().managerReducer.Accounts
      //
      // accounts.push(data)
      alert("Insert Success")

      return dispatch(getAllAccounts())

    }).catch((reason) => {
      // console.log("ERROR ", reason);
    })
  }
}

export const deleteAccount = (accountId) => {
  return (dispatch, getState) => {
    axios.delete(`http://localhost:3000/accounts/${accountId}`)
    .then((response) => {

      alert("Delete Success")

      return dispatch(getAllAccounts())

    }).catch((reason) => {
      // console.log("ERROR ", reason);
    })
  }
}

export const editAccount = (accountId, account) => {
  return (dispatch, getState) => {
    axios.put(`http://localhost:3000/accounts/${accountId}`, account, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {

      alert("Edit Success")

      return dispatch(getAllAccounts())

    }).catch((reason) => {
      // console.log("ERROR ", reason);
    })
  }
}
