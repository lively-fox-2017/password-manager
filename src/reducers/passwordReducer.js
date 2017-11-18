const initialState = {
  passwords: [],
};

const passwordReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_PASSWORDS':
      return {...state, passwords: action.payload.passwords};
    default:
      return state;
  }
};

export default passwordReducer;
