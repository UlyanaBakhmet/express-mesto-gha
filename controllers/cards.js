const Card = require('../models/card');

const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getCards = (req, res, next) => {
  Card
    .find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card
    .create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('При создании карточки произошла ошибка'));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card
    .findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }
      return Card.findByIdAndRemove(cardId);
    })

    .then(() => res.send({ message: 'Карточка успешно удалена' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError('При загрузке карточки произошла ошибка'));
      }

      return next(err);
    });
};

module.exports.addCardLike = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      return res.send({ message: 'Лайк успешно добавлен на карточку' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError('При добавлении лайка на карточу произошла ошибка'));
      }

      return next(err);
    });
};

module.exports.deleteCardLike = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      return res.send({ message: 'Лайк с карточки успешно удалён' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError('При удалении лайка с карточки произошла ошибка'));
      }

      return next(err);
    });
};
