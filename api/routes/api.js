const passport = require('passport')
require('../config/passport')(passport)
const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const authController = require('../controller/authController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const userMiddleware = require('../middlewares/userMiddleware')

const userValidator = require('../middlewares/validator/createUserValidator')

const jwtMiddleware = passport.authenticate('jwt', { session: false })

/**
 * !!!! YOU MUST UPDATE SWAGGER.YAML FILE EACH TIME YOU ADD A ROUTE !!!!
 */

/**
 * Auth routes
 */
router.post('/signin', authController.signin)
router.post('/adminsignin', authController.adminSignin)

/**
 * Set Admin routes
 */
router.put('/setadmin/:id', [jwtMiddleware, adminMiddleware.isAdmin, userValidator.setAdmin], userController.setAdmin)

/**
 * Users routes
 */
router.route('/users')
  .get([jwtMiddleware, adminMiddleware.isAdmin], userController.index)
  .post(userValidator.register, userController.new)

router.route('/users/:id')
  .get([jwtMiddleware, userMiddleware.isUserOrAdmin], userController.view)
  .put([jwtMiddleware, userValidator.update], userController.update)
  .delete(jwtMiddleware, userController.delete)

router.put('/users/admin/:id', [jwtMiddleware, adminMiddleware.isAdmin, userValidator.updateAnUser], userController.updateAnUser)

module.exports = router
