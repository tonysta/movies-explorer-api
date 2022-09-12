const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUser, updateUser } = require('../controllers/users');

usersRouter.get('/users/me', getUser);
usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
}), updateUser);

module.exports = usersRouter;
