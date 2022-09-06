const mongoose = require('mongoose');
const validator = require('validator');

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

module.exports = mongoose.model('user', userSchema);
