import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as ExampleReducer } from './Example/Reducers'
import { reducer as AuthReducer } from './Auth/Reducers'
import { reducer as ColyseusReducer } from './Colyseus/Reducers'

export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    example: ExampleReducer,
    auth: AuthReducer,
    colyseus: ColyseusReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
