const initialState = {
  passwords: [],
  searches: [],
};

const passwordReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_PASSWORDS':
      return {...state, passwords: action.payload.passwords};
    case 'FETCH_SEARCHES':
      return {...state, searches: action.payload.searches};
    default:
      return state;
  }
};

export default passwordReducer;
