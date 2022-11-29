const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
mongoose.Schema.Types.String.set('trim', true);
const Questions = require('./Question')

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  randomReview: {Boolean, default: false},
  dailyEffortEmail: {Boolean, default: false},
  questions : [ {question: {
                type: String,
                required: true,
              },
              qtype: {
                type: String,
                required: true,
              },
              qsource: {
                type: String,
                required: true
              },
              response:{
                type: String,
                required: false,
                default: ''
              }}]
})

// Password hash middleware.
 
 UserSchema.pre('save', function save(next) {
  const user = this
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})


// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)
