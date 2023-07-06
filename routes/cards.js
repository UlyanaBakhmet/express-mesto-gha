const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../utils/constants');

const {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  deleteCardLike,
} = require('../controllers/cards');

router.get('/', getCards);

// router.post('/', createCard);
router.post('/', celebrate({

  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlRegex),
  }),

}), createCard);

// router.delete('/:cardId', deleteCard);
router.delete('/:cardId', celebrate({

  params: Joi.object().keys({
    cardId: Joi.string().alphanum().hex().length(24),
  }),

}), deleteCard);

// router.put('/:cardId/likes', addCardLike);
router.put('/:cardId/likes', celebrate({

  params: Joi.object().keys({
    cardId: Joi.string().alphanum().hex().length(24),
  }),

}), addCardLike);

// router.delete('/:cardId/likes', deleteCardLike);
router.delete('/:cardId/likes', celebrate({

  params: Joi.object().keys({
    cardId: Joi.string().alphanum().hex().length(24),
  }),

}), deleteCardLike);

module.exports = router;
