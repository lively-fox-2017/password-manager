import {put, call, takeLatest} from 'redux-saga/effects'

import {
  requestAPI,
  recieveAccounts,
  failedRequest,
  addAccount,
  FETCH_ACCOUNTS,
  FETCH_ADD_ACCOUNT
} from '../actions/AccountActions'
import {getAccountsApi, postAccountApi} from '../services/index'

export const fetchAccounts = function* () {
  yield put(requestAPI())
  const {data, error} = yield call(getAccountsApi)
  if (data) {
    yield put(recieveAccounts(data))
  } else {
    yield put(failedRequest(error))
  }
}

export const fetchAddAccount = function* ({payload}) {
  yield put(requestAPI())
  const {data, error} = yield call(postAccountApi, payload.account)
  if (data) {
    yield put(addAccount(data))
  } else {
    yield put(failedRequest(error))
  }
}

export const watchFetchAccount = function* () {
  yield takeLatest(FETCH_ACCOUNTS, fetchAccounts)
}

export const watchAddAccount = function* () {
  yield takeLatest(FETCH_ADD_ACCOUNT, fetchAddAccount)
}
