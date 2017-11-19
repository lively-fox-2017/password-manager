import { fork, all } from 'redux-saga/effects'

import { watchFetchAccount, watchAddAccount } from './AccountSagas'

const rootSaga = function* () {
  yield all([
    fork(watchFetchAccount),
    fork(watchAddAccount)
  ])
}

export default rootSaga
