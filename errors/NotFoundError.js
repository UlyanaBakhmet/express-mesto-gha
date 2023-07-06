//Ошибка 404 - стандартный код ответа HTTP о том,
//что клиент был в состоянии общаться с сервером,
//но сервер не может найти данные согласно запросу.
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;