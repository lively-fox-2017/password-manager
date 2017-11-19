import { combineReducers } from 'redux';
// import { newsReducers } from './news'

const user = {
  usersuccessget: []
}

const newsReducers = (state = user, action) => {
  switch (action.type) {
    case 'GET_USER':
    console.log(action)
      return {...state, usersuccessget:action.value}
      console.log(this.user.usersuccessget)
    default:
      return state;
  }
};

export default combineReducers({
  usersuccessget: newsReducers,
  // newsone: newsReducers
});
