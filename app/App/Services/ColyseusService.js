import * as Colyseus from 'colyseus.js'
import { Config } from 'App/Config'

const client = new Colyseus.Client(Config.SOCKET_URL)

export const ColyseusService = {
  client,
}
