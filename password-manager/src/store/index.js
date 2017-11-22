import { createStore } from 'redux'
import reducer from '../reducers/users'

const store = createStore(
  reducer
)

export default store
