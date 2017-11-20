import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import accountsReducer from './accounts';

const reducer = combineReducers({
  accountsReducer,
  form:formReducer
});

export default reducer;
