import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducers from '../reducers'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = applyMiddleware({
  thunkMiddleware
})

export const store = createStore(
  reducers,
  composeEnhancer(middleware)
)
