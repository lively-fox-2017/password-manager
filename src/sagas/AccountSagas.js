import { put, call, takeLatest } from 'redux-saga/effects'

import { requestAccounts, recieveAccounts, failedRequest, FETCH_ACCOUNTS } from '../actions/AccountActions'
import { accountsApi } from '../services/index'

export const fetchAccounts = function* () {
  yield put(requestAccounts())
  const { data, error } = yield call(accountsApi)
  if (data) {
    yield put(recieveAccounts(data))
  } else {
    yield put(failedRequest(error))
  }
}

export const watchFetchAccount = function* () {
  yield takeLatest(FETCH_ACCOUNTS, fetchAccounts)
}
