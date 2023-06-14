const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((req, res, next) => {
  res.status(404).send({ message: 'Ошибка 404: страница не найдена' });
});

module.exports = router;