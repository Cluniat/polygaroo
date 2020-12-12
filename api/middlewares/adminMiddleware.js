module.exports = {
  isAdmin: (req, res, next) => {
    if (req.user.is_admin) next()
    else {
      res.status(401).send({
        status: 401,
        success: false,
        message: 'You are not allowed.'
      })
    }
  }
}
