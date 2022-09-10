const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../utils/errors/unauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    unique: true,
    type: String,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'неверный формат email',
    },
  },
  password: {
    required: true,
    select: false,
    type: String,

  },
  name: {
    required: true,
    type: String,
    minlength: [2, 'Необходимо ввести 2 или более символов, вы ввели {VALUE}'],
    maxlength: [30, 'Необходимо ввести 30 или менее символов, вы ввели {VALUE}'],
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
