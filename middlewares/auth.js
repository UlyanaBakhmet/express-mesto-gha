const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new AuthError('Нужна авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, 'someUniqueSecretKey');
  } catch (err) {
    throw new AuthError('Нужна авторизация');
  }
  req.user = payload;
  next();
};
