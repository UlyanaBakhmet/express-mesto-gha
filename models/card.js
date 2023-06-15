const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      required: [true, 'Поле "name" должно быть заполнено'],
    },
    link: {
      type: String,
      validate: {
        validator: (v) => isUrl(v),
        message: 'Некорректный URL',
      },
      required: [true, 'Поле заполнено некорректно'],
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: [true, 'Пользователь не обнаружен'],
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
