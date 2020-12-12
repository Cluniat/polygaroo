const { validationResult, check } = require('express-validator')

module.exports = {
  register: [
    check('email').exists().notEmpty().isEmail().withMessage('email invalid'),
    check('password').exists().notEmpty().isLength({ min: 5 }).withMessage('password must be 5 char long'),
    check('name').exists().notEmpty().withMessage('Name cannot be empty'),
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).send({
          status: 422,
          success: false,
          message: 'Unprocessable entity',
          errors: errors.array()
        })
      }
      next()
    }],
  update: [
    check('name').notEmpty().withMessage('Name cannot be empty'),
    check('birth_date').isISO8601().withMessage('birth_data invalid'),
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).send({
          status: 422,
          success: false,
          message: 'Unprocessable entity',
          errors: errors.array()
        })
      }
      next()
    }
  ],
  updateAnUser: [
    check('name').notEmpty().withMessage('Name cannot be empty'),
    check('birth_date').isISO8601().withMessage('birth_data invalid'),
    check('email').isEmail().withMessage('Email must be valid'),
    check('password').notEmpty().withMessage('Password cannot be empty'),
    check('nb_recale_games').notEmpty().withMessage('Nb recale games cannot be empty'),
    check('level').notEmpty().withMessage('Level cannot be empty'),
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).send({
          status: 422,
          success: false,
          message: 'Unprocessable entity',
          errors: errors.array()
        })
      }
      next()
    }
  ],
  setAdmin: [
    check('is_admin').isBoolean().withMessage('is_admin must be boolean'),
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).send({
          status: 422,
          success: false,
          message: 'Unprocessable entity',
          errors: errors.array()
        })
      }
      next()
    }
  ]
}
