const databaseUtils = require('./Utils/databaseUtils')
const userAdmin = require('./data/userAdmin')
const mongoose = require('mongoose')
const User = require('../models/userModel')
const normalUser = require('./data/user')
const request = require('supertest')
const index = require('../index')
// eslint-disable-next-line no-undef
describe('Sign in calls', () => {
  // eslint-disable-next-line no-undef
  beforeAll(async () => {
    // await mongoose.connect(testDatabase.database)
    // await mongoose.connection
    await databaseUtils.clearDatabase()
    await databaseUtils.initializeDatabase()
  })
  // eslint-disable-next-line no-undef
  afterAll(async () => {
    await mongoose.connection.close()
    index.app.close()
  })
  // eslint-disable-next-line no-undef
  test('should have insert users', async (done) => {
    const insertedAdminUser = await User.findOne({ email: userAdmin.email })
    const insertedUser = await User.findOne({ email: normalUser.email })
    // eslint-disable-next-line no-undef
    expect(insertedAdminUser.email).toEqual(userAdmin.email)
    // eslint-disable-next-line no-undef
    expect(insertedUser.email).toEqual(normalUser.email)
    done()
  })
  // eslint-disable-next-line no-undef
  test('should admin sign in with admin user', async (done) => {
    // eslint-disable-next-line no-undef
    request(index.app).post('/api/adminsignin').send({ email: userAdmin.email, password: userAdmin.password }).expect(200).end(done)
  })
  // eslint-disable-next-line no-undef
  test('should not admin sign in with normal user', async (done) => {
    // eslint-disable-next-line no-undef
    request(index.app).post('/api/adminsignin').send({ email: normalUser.email, password: normalUser.password }).expect(401).end(done)
  })
  // eslint-disable-next-line no-undef
  test('should sign in with admin user', async (done) => {
    // eslint-disable-next-line no-undef
    request(index.app).post('/api/signin').send({ email: userAdmin.email, password: userAdmin.password }).expect(200).end(done)
  })
  // eslint-disable-next-line no-undef
  test('should sign in with normal user', async (done) => {
    // eslint-disable-next-line no-undef
    request(index.app).post('/api/signin').send({ email: normalUser.email, password: normalUser.password }).expect(200).end(done)
  })
})
