//Ошибка 401 - попытка получить доступ к странице,
//на которую нужно сначала войти,
//используя действительный ID пользователя
//и пароль для просмотра.
class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = AuthError;