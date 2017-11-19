import { fork, all } from 'redux-saga/effects'

import { watchFetchAccount, watchAddAccount, watchDeleteAccount } from './AccountSagas'

const rootSaga = function* () {
  yield all([
    fork(watchFetchAccount),
    fork(watchAddAccount),
    fork(watchDeleteAccount)
  ])
}

export default rootSaga
