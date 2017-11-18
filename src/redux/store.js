import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import account from './reducers/account';

const store = createStore(account, applyMiddleware(thunk));

export default store;
