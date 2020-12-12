import { INITIAL_STATE } from './InitialState'
import { ColyseusTypes } from './Actions'
import { createReducer } from 'reduxsauce'

export const colyseusSuccess = (state, { client }) => ({
  ...state,
  colyseusClient: client,
})

export const setRoomSuccess = (state, { room }) => ({
  ...state,
  currentRoom: room,
})

export const setGameNameSuccess = (state, { gameName }) => ({
  ...state,
  currentGameName: gameName,
})

export const reducer = createReducer(INITIAL_STATE, {
  [ColyseusTypes.GET_COLYSEUS_CLIENT]: colyseusSuccess,
  [ColyseusTypes.SET_CURRENT_ROOM]: setRoomSuccess,
  [ColyseusTypes.SET_CURRENT_GAME_NAME]: setGameNameSuccess,
})
