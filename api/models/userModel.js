const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

// setup schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  is_admin: {
    type: Boolean,
    default: false
  },
  birth_date: {
    type: Date,
    default: Date.now()
  },
  create_date: {
    type: Date,
    default: Date.now()
  },
  historic: {
    type: Array,
    default: []
  },
  good_decision: {
    type: Array,
    default: []
  },
  wins: {
    type: Array,
    default: []
  },
  nb_recale_games: {
    type: Number,
    default: 0
  },
  nb_games: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  }
})

userSchema.pre('save', function (next) {
  const user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err)
      }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          return next(err)
        }
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

userSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', userSchema)
