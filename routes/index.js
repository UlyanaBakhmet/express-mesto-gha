const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use((req, res, next) => {
  res.status(404).send({ message: 'Ошибка 404: страница не найдена' });
});

module.exports = router;
