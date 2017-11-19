import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import account from './reducers/account';
import socMedAccountForm from './reducers/socMedAccountForm';

const reducers = combineReducers({
  account,
  socMedAccountForm,
})
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
