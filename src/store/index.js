import {createStore, compose, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = applyMiddleware(sagaMiddleware)

const configureStore = () => {
  return {
    ...createStore(rootReducer, composeEnhancer(middleware)),
    runSaga: sagaMiddleware.run(rootSaga)
  }
}

export default configureStore
