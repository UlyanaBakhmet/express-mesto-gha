const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../utils/constants');

const {
  getUsers,
  getUser,
  getUserById,
  // createUser,
  updateAvatar,
  updateUser,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().hex()
      .length(24),
  }),
}), getUserById);

// router.post('/', createUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(urlRegex),
  }),
}), updateAvatar);

module.exports = router;
