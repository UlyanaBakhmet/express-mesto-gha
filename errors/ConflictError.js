//Ошибка 409 - конфликт запроса с текущим состоянием сервера
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;