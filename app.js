const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '648214099e96851efb50ca0a',
  };

  next();
});

app.use(router);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.listen(PORT, () => {
  console.log(`Запуск сервера на ${PORT} порту`);
});