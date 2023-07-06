//ошибка 403 - доступ к запрошенному ресурсу запрещен
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;