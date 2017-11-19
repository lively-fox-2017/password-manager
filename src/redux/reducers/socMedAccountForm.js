import actions from '../actions/SocMedAccountForm';

function socMedAccountForm(state=[], action) {
  switch (action.type) {
    case actions.usernameValue().type:
      return Object.assign({}, state, action.state);
    case actions.passwordValue().type:
      return Object.assign({}, state, action.state);
    case actions.urlValue().type:
      return Object.assign({}, state, action.state);
    case actions.clearAll().type:
      return action.state;
    case actions.populateToEdit().type:
      return Object.assign({}, state, action.state);
  }
  return state;
}

export default socMedAccountForm;
