const User = require('../models/userModel')

module.exports = {
  isUserOrAdmin: (req, res, next) => {
    if (req.user.is_admin) next()
    else {
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
        } else if (user.id === req.user.id) next()
        else {
          return res.status(401).send({
            status: 401,
            success: false,
            message: 'You are not allowed.'
          })
        }
      })
    }
  }
}
