import { fork } from 'redux-saga/effects'

import { watchFetchAccount } from './AccountSagas'

const rootSaga = function* () {
  yield fork(watchFetchAccount)
}

export default rootSaga
