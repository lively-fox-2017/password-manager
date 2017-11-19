import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import indexReducer from '../reducers'

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = applyMiddleware(thunk, logger)
const enchancer = devtools(middleware)

const store = createStore(indexReducer, enchancer)

export default store
