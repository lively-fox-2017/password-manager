import { fork, all } from 'redux-saga/effects'

import { watchFetchAccount, watchAddAccount, watchDeleteAccount, watchUpdateAccount } from './AccountSagas'

const rootSaga = function* () {
  yield all([
    fork(watchFetchAccount),
    fork(watchAddAccount),
    fork(watchDeleteAccount),
    fork(watchUpdateAccount)
  ])
}

export default rootSaga
