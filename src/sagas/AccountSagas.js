import {put, call, takeLatest} from 'redux-saga/effects'

import {
  requestAPI,
  recieveAccounts,
  failedRequest,
  addAccount,
  updateAccount,
  deleteAccount,
  FETCH_ACCOUNTS,
  FETCH_UPDATE_ACCOUNT,
  FETCH_ADD_ACCOUNT,
  FETCH_DELETE_ACCOUNT
} from '../actions/AccountActions'
import {getAccountsApi, postAccountApi, putAccountApi, deleteAccountApi} from '../services/index'

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

export const fetchUpdateAccount = function* ({payload}) {
  yield put(requestAPI())
  const {data, error} = yield call(putAccountApi, payload.account)
  if (data) {
    yield put(updateAccount(payload.account))
  } else {
    yield put(failedRequest(error))
  }
}

export const fetchDeleteAccount = function* ({payload}) {
  yield put(requestAPI())
  const {data, error} = yield call(deleteAccountApi, payload.id)
  if (data) {
    yield put(deleteAccount(payload.id))
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

export const watchUpdateAccount = function* () {
  yield takeLatest(FETCH_UPDATE_ACCOUNT, fetchUpdateAccount)
}

export const watchDeleteAccount = function* () {
  yield takeLatest(FETCH_DELETE_ACCOUNT, fetchDeleteAccount)
}
