import NavigationService from 'App/Services/NavigationService'
import { ColyseusService } from 'App/Services/ColyseusService'
import ColyseusActions from 'App/Stores/Colyseus/Actions'
import { put, select } from 'redux-saga/effects'
import { isLogged } from 'App/Stores/Auth/Selectors'

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  const client = ColyseusService.client
  console.log(client)
  yield put(ColyseusActions.getColyseusClient(client))

  const token = yield select(isLogged)
  if (token) {
    NavigationService.navigateAndReset('Home')
  } else {
    NavigationService.navigateAndReset('MainScreen')
  }
}
