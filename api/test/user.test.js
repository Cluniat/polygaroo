const databaseUtils = require('./Utils/databaseUtils')
const userAdmin = require('./data/userAdmin')
const mongoose = require('mongoose')
const User = require('../models/userModel')
const normalUser = require('./data/user')
const request = require('supertest')
const index = require('../index')
// eslint-disable-next-line no-undef
describe('User REST calls', () => {
  let normalToken
  let adminToken
  // eslint-disable-next-line no-undef
  beforeAll(async (done) => {
    await databaseUtils.clearDatabase()
    await databaseUtils.initializeDatabase()
    request(index.app).post('/api/signin').send({
      email: normalUser.email,
      password: normalUser.password
    }).end((err, response) => {
      if (err) console.log(err)
      normalToken = response.body.data.token
      done()
    })
    request(index.app).post('/api/signin').send({
      email: userAdmin.email,
      password: userAdmin.password
    }).end((err, response) => {
      if (err) console.log(err)
      adminToken = response.body.data.token
      done()
    })
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
  test('should be unauthorize for normalUser', async (done) => {
    request(index.app).get('/api/users').set('Authorization', `${normalToken}`).expect(401).end(done)
  })
  // eslint-disable-next-line no-undef
  test('should get all users', async (done) => {
    request(index.app).get('/api/users').set('Authorization', `${adminToken}`).expect(200).end(done)
  })
  // eslint-disable-next-line no-undef
  test('should get a user', async (done) => {
    const insertedUser = await User.findOne({ email: normalUser.email })
    request(index.app).get(`/api/users/${insertedUser.id}`).set('Authorization', `${adminToken}`).expect(200).end(done)
  })
  // eslint-disable-next-line no-undef
  test('should delete a user', async (done) => {
    const insertedUser = await User.findOne({ email: normalUser.email })
    request(index.app).delete(`/api/users/${insertedUser.id}`).set('Authorization', `${adminToken}`).expect(204).end(done)
  })
  // eslint-disable-next-line no-undef
  test('should insert a user', async (done) => {
    request(index.app).post('/api/users').send({ ...normalUser }).expect(201).end(done)
  })
  // eslint-disable-next-line no-undef
  test('should update a user', async (done) => {
    const insertedUser = await User.findOne({ email: normalUser.email })
    insertedUser.name = 'test'
    request(index.app).put(`/api/users/${insertedUser.id}`).send(insertedUser).set('Authorization', `${adminToken}`).expect(200).end(done)
  })
})
