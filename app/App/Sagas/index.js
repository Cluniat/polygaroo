import { all, takeLatest } from 'redux-saga/effects'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { AuthTypes } from 'App/Stores/Auth/Actions'
import { startup } from './StartupSaga'
import { login, register, edit } from './Auth/AuthSaga'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup),
    // Call `fetchUser()` when a `FETCH_USER` action is triggered
    // takeLatest(ExampleTypes.FETCH_USER, fetchUser),
    takeLatest(AuthTypes.LOGIN, login),
    takeLatest(AuthTypes.REGISTER, register),
    takeLatest(AuthTypes.EDIT, edit),
  ])
}
