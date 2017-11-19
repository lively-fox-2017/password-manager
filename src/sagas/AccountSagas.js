import {put, call, takeLatest} from 'redux-saga/effects'

import {
  requestAPI,
  recieveAccounts,
  failedRequest,
  addAccount,
  deleteAccount,
  FETCH_ACCOUNTS,
  FETCH_ADD_ACCOUNT,
  FETCH_DELETE_ACCOUNT
} from '../actions/AccountActions'
import {getAccountsApi, postAccountApi, deleteAccountApi} from '../services/index'

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

export const fetchDeleteAccount = function* ({payload}) {
  yield put(requestAPI())
  const {data, error} = yield call(deleteAccountApi, payload.id)
  if (data) {
    yield put(deleteAccount(data.id))
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

export const watchDeleteAccount = function* () {
  yield takeLatest(FETCH_DELETE_ACCOUNT, fetchDeleteAccount)
}
