const Card = require('../models/card');

const {
  badRequestError,
  dataNotFoundError,
  internalServerError,
  notFoundMessage,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card
    .find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(internalServerError).send({ message: notFoundMessage }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card
    .create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequestError).send({ message: 'При создании карточки произошла ошибка' });
      } else {
        res.status(internalServerError).send({ message: notFoundMessage });
      }
    });
};

// module.exports.deleteCard = (req, res) => {
//   const { cardId } = req.params;
//   Card
//     .findByIdAndDelete(cardId)
//     .orFail()
//     .then((card) => res.status(200).send(card))
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         res.status(badRequestError).send({ message: 'При загрузке карточки произошла ошибка' });
//         return;
//       }
//       if (err.name === 'NotFoundError') {
//         res.status(dataNotFoundError).send({ message: 'Запрашиваемая карточка не найдена' });
//         return;
//       }

//       res.status(internalServerError).send({ message: notFoundMessage });
//     });
// };
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card
    .findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        return res.status(dataNotFoundError).send({ message: 'Запрашиваемая карточка не найдена' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequestError).send({ message: 'При загрузке карточки произошла ошибка' });
        return;
      }
      res.status(internalServerError).send({ message: notFoundMessage });
    });
};

module.exports.addCardLike = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        return res.status(dataNotFoundError).send({ message: 'Запрашиваемая карточка не найдена' });
      }

      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequestError).send({ message: 'При добавлении лайка на карточу произошла ошибка' });
        return;
      }

      res.status(internalServerError).send({ message: notFoundMessage });
    });
};

module.exports.deleteCardLike = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        return res.status(dataNotFoundError).send({ message: 'Запрашиваемая карточка не найдена' });
      }

      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequestError).send({ message: 'При удалении лайка с карточки произошла ошибка' });
        return;
      }

      res.status(internalServerError).send({ message: notFoundMessage });
    });
};
