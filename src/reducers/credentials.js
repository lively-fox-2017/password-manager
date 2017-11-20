const defaultState = { credentials: [] };

const CredentialReducer = (state=defaultState, action) => {
  switch(action.type) {
    case 'SET_CREDENTIALS':
      return {...state, credentials: action.payload.credentials};
    default:
      return state;
  }
};

export default CredentialReducer;