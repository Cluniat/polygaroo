const User = require('../../models/userModel')
const adminUser = require('../data/userAdmin')
const normalUser = require('../data/user')

exports.clearDatabase = () => {
  return new Promise((resolve, reject) => {
    User.deleteMany({ name: /test/ }).then(() => resolve()).catch((error) => reject(error))
  })
}

exports.initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    const newAdmin = new User({ ...adminUser })
    newAdmin.save().then(() => {
      const newUser = new User({ ...normalUser })
      newUser.save().then(() => resolve()).catch((error) => reject(error))
    }).catch((error) => reject(error))
  })
}
