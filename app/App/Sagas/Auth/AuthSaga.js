import { put, call } from 'redux-saga/effects'
import AuthActions from 'App/Stores/Auth/Actions'
import { AuthService } from 'App/Services/AuthService'
import { DropDownHolder } from 'App/Services/DropDownHolder'
import NavigationService from 'App/Services/NavigationService'

export function* login({ email, password }) {
  yield put(AuthActions.loginLoading())

  const response = yield call(AuthService.login, email, password)
  if (response) {
    yield put(AuthActions.loginSuccess(response))
  } else {
    yield put(AuthActions.loginFailure('email or password incorrect'))
    DropDownHolder.dropDown.alertWithType('error', 'Error', 'Email or password incorrect')
  }
}

export function* register({ email, password, name, birthday }) {
  yield put(AuthActions.registerLoading())

  const response = yield call(AuthService.register, email, password, name, birthday)
  if (response.ok) {
    yield put(AuthActions.registerSuccess(response))
    NavigationService.navigate('MainScreen')
    DropDownHolder.dropDown.alertWithType('success', 'success', 'User created')
  } else {
    yield put(AuthActions.registerFailure(AuthService.parseErrors(response.errors)))
    DropDownHolder.dropDown.alertWithType('error', 'Error', 'At least one field is incorrect')
  }
}

export function* edit({ token, userId, email, password, name, birthday }) {
  yield put(AuthActions.editLoading())

  const response = yield call(AuthService.edit, token, userId, email, password, name, birthday)
  if (response) {
    yield put(AuthActions.editSuccess(response))
    DropDownHolder.dropDown.alertWithType('success', 'success', 'User updated')
  } else {
    yield put(AuthActions.editFailure('at least one field is incorrect'))
    DropDownHolder.dropDown.alertWithType('error', 'Error', 'At least one field is incorrect')
  }
}
