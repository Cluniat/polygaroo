const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const { testDatabase, database } = require('./config')
const bodyParser = require('body-parser')
const YAML = require('yamljs')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = YAML.load('./swagger.yaml')
const http = require('http')
const colyseus = require('colyseus')
const monitor = require('@colyseus/monitor').monitor
const Polygaroom = require('./colyseus/Polygaroom').Polygaroom

// initialize the app
const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// Connection to mongodb
if (process.env.NODE_ENV === 'test') {
  mongoose.connect(testDatabase.database)
} else {
  mongoose.connect(database.database)
}

// Make this server CORS-ENABLE
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

// Declare API route variable
const api = require('./routes/api')
app.use('/api', api)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Initialize passport
app.use(passport.initialize())

const db = mongoose.connection
if (!db) {
  console.log('error connecting db')
} else {
  console.log('db connected successfully')
}

// choose port
const port = process.env.PORT || 3000
// init colyseus
const server = http.createServer(app)
const gameServer = new colyseus.Server({
  server: server,
  express: app
})
gameServer.define('polygaroom', Polygaroom)
app.use('/colyseus', monitor(gameServer))
gameServer.onShutdown(() => console.log('Game server is shutting down'))

if (process.env.NODE_ENV !== 'test') {
  gameServer.listen(port, () => {
    console.log(`---SERVER INITIALIZED ON PORT : ${port}---`)
  })
}

exports.app = app
exports.db = db
