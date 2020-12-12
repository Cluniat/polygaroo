const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const config = require('../config/database')

/**
 * Login for bo user
 * @param req
 * @param res
 */
exports.adminSignin = (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) {
      res.status(400).send({
        status: 400,
        success: false,
        message: 'Find error.',
        data: err.toString()
      })
    } else if (!user) {
      res.status(404).send({
        status: 404,
        success: false,
        message: 'Authentication failed. User not found.'
      })
    } else if (!user.is_admin) {
      res.status(401).send({
        status: 401,
        success: false,
        message: 'Authentication failed. User is not an admin.'
      })
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          // create a token
          const token = jwt.sign(user.toJSON(), config.secret)
          res.status(200).send({
            status: 200,
            success: true,
            message: 'You are successfully logged in.',
            data: {
              token: `Bearer ${token}`,
              user: user
            }
          })
        } else {
          res.status(422).send({
            status: 422,
            success: false,
            message: 'Authentication failed. Wrong password.'
          })
        }
      })
    }
  })
}

/**
 * Login application
 * @param req
 * @param res
 */
exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) {
      res.status(400).send({
        status: 400,
        success: false,
        message: 'Find rror.',
        data: err.toString()
      })
    } else if (!user) {
      res.status(404).send({
        status: 404,
        success: false,
        message: 'Authentication failed. User not found.'
      })
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          // create a token
          const token = jwt.sign(user.toJSON(), config.secret)
          res.status(200).send({
            status: 200,
            success: true,
            message: 'You are successfully logged in.',
            data: {
              token: `Bearer ${token}`,
              user: user
            }
          })
        } else {
          res.status(422).send({
            status: 422,
            success: false,
            message: 'Authentication failed. Wrong password.'
          })
        }
      })
    }
  })
}
