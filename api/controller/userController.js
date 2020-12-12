const User = require('../models/userModel')

/**
 * Get all users
 * @param req
 * @param res
 */
exports.index = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).send({
        status: 400,
        success: false,
        message: 'Error.',
        data: err.toString()
      })
    }
    return res.status(200).send({
      status: 200,
      success: true,
      message: 'Successfully retrieve users.',
      data: users
    })
  })
}

/**
 * Create a new user
 * @param req
 * @param res
 */
exports.new = (req, res) => {
  const newUser = new User({ ...req.body })
  // save the user
  newUser.save((err) => {
    if (err) {
      return res.status(409).send({
        status: 409,
        success: false,
        message: 'Email or name already exist.',
        data: err.toString()
      })
    }
    return res.status(201).send({
      status: 201,
      success: true,
      message: 'New user created successfully.',
      data: newUser
    })
  })
}

/**
 * Get a specific user
 * @param req
 * @param res
 */
exports.view = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(400).send({
        status: 400,
        success: false,
        message: 'Error.',
        data: err.toString()
      })
    } else if (!user) {
      return res.status(404).send({
        status: 404,
        success: false,
        message: 'User not found.'
      })
    } else {
      return res.status(200).send({
        status: 200,
        success: true,
        message: 'User retrieved successfully.',
        data: user
      })
    }
  })
}

/**
 * Set IsAdmin for a specific user
 * @param req
 * @param res
 */
exports.setAdmin = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(400).send({
        status: 400,
        success: false,
        message: 'Error.',
        data: err.toString()
      })
    } else if (!user) {
      return res.status(404).send({
        status: 404,
        success: false,
        message: 'User not found.'
      })
    } else {
      user.is_admin = req.body.is_admin
      user.save((err) => {
        if (err) {
          return res.status(400).send({
            status: 400,
            success: false,
            message: 'User update failed.',
            data: err.toString()
          })
        } else {
          return res.status(200).send({
            status: 200,
            success: true,
            message: 'User updated successfully.',
            data: user
          })
        }
      })
    }
  })
}

/**
 * Update a specific user
 * @param req
 * @param res
 */
exports.update = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(400).send({
        status: 400,
        success: false,
        message: 'Update failed. Find error.',
        data: err.toString()
      })
    } else if (!user) {
      return res.status(404).send({
        status: 404,
        success: false,
        message: 'Update failed. User not found.'
      })
    } else {
      if (req.body.name) user.name = req.body.name
      if (req.body.birth_date) user.birth_date = req.body.birth_date

      user.save((err) => {
        if (err) {
          return res.status(400).send({
            status: 400,
            success: false,
            message: 'Update failed. Save error',
            data: err.toString()
          })
        } else {
          return res.status(200).send({
            status: 200,
            success: true,
            message: 'User updated successfully.',
            data: user
          })
        }
      })
    }
  })
}

/**
 * Update a specific user when user connected is admin
 * @param req
 * @param res
 */
exports.updateAnUser = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(400).send({
        status: 400,
        success: false,
        message: 'Update failed. Find error.',
        data: err.toString()
      })
    } else if (!user) {
      return res.status(404).send({
        status: 404,
        success: false,
        message: 'Update failed. User not found.'
      })
    } else {
      if (req.body.name) user.name = req.body.name
      if (req.body.birth_date) user.birth_date = req.body.birth_date
      if (req.body.email) user.email = req.body.email
      if (req.body.password) user.password = req.body.password
      if (req.body.nb_recale_games) user.nb_recale_games = req.body.nb_recale_games
      if (req.body.level) user.level = req.body.level

      user.save((err) => {
        if (err) {
          return res.status(400).send({
            status: 400,
            success: false,
            message: 'Update failed. Save error',
            data: err.toString()
          })
        } else {
          return res.status(200).send({
            status: 200,
            success: true,
            message: 'User updated successfully.',
            data: user
          })
        }
      })
    }
  })
}

/**
 * Delete a specific user
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(400).send({
        status: 400,
        success: false,
        message: 'Remove failed on find. User not found.',
        data: err.toString()
      })
    } else if (!user) {
      return res.status(404).send({
        status: 404,
        success: false,
        message: 'Remove failed. user not found.'
      })
    } else {
      user.remove((err) => {
        if (err) {
          return res.status(400).send({
            status: 400,
            success: false,
            message: 'Remove failed during remove. User not found.',
            data: err.toString()
          })
        } else {
          return res.status(204).send({
            status: 204,
            success: true,
            message: 'User deleted successfully but 204 no content.'
          })
        }
      })
    }
  })
}
