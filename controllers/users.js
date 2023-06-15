const userSchema = require('../models/user');

const {
  badRequestError,
  dataNotFoundError,
  internalServerError,
  notFoundMessage,
} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch(() => res.status(internalServerError).send({ message: notFoundMessage }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  userSchema
    .findById(userId)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequestError).send({ message: 'Указан некорректный ID' });
        return;
      }
      if (err.name === 'NotFoundError') {
        res.status(dataNotFoundError).send({ message: 'Пользователь с таким ID не найден' });
        return;
      }

      res.status(internalServerError).send({ message: notFoundMessage });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userSchema
    .create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequestError).send({ message: 'Возникла ошибка при создании пользователя' });
        return;
      }

      res.status(internalServerError).send({ message: notFoundMessage });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  userSchema
    .findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequestError).send({ message: 'При обновлении аватара пользователя возникла ошибка' });
        return;
      }

      res.status(internalServerError).send({ message: notFoundMessage });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  userSchema
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequestError).send({ message: 'При обновлении данных пользователя возникла ошибка' });
        return;
      }

      res.status(internalServerError).send({ message: notFoundMessage });
    });
};
