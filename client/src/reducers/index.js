import { combineReducers } from 'redux';
// import { newsReducers } from './news'

const user = {
  usersuccessget: [],
  usersatuan: '',
  knopform: false
}

const newsReducers = (state = user, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {...state, usersuccessget:action.value}
    case 'GET_ONE_USER':
    console.log(action.value)
      return {...state, usersatuan:action.value}
    case 'GET_KNOP':
      return {...state, knopform:action.value}
    default:
      return state;
  }
};

export default combineReducers({
  usersuccessget: newsReducers,
  // newsone: newsReducers
});
