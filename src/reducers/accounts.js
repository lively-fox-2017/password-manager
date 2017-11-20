const initialState = {
  accounts: [],
  showedAccounts: [],
  account: {
    url: '',
    username: '',
    password: ''
  }
}

const accountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL':
      return {...state, accounts: action.payload.accounts}
    case 'SHOW_DATA':
      return {...state, showedAccounts: action.payload.accounts}
    case 'SET_ACCOUNT':
      return {...state, account: action.payload.account}
    default:
      return state
  }
}

export default accountsReducer
