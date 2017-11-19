import accountCrud from '../actions/account';

function account(state=[], action) {
  switch (action.type) {
    case accountCrud.setAccounts().type:
      return action.state;
    default:
      return {accounts: []}
  }
}

export default account;
