import { combineReducers } from 'redux'
import { reducer as searchReducer} from 'redux-search'

import managerReducer from './managerReducer'

const indexReducer = combineReducers({
  searchReducer,
  managerReducer
})

export default indexReducer
