import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  getColyseusClient: ['client'],
  setCurrentRoom: ['room'],
  setCurrentGameName: ['gameName'],
})

export const ColyseusTypes = Types
export default Creators
