const MONGO_URL = 'mongodb://localhost:27017/moviesdb';
const PORT = '3001';
const JWT_SECRET_DEV = 'allcatsarebeautiful';

// Error message
const NOT_FOUND_MOVIE_MSG = 'Фильм не найден';
const BAD_DATA_MSG = 'Неверный формат данных';
const OTHER_PEOPLES_MOVIES_MSG = 'Вы не можете удалять фильмы из чужого сохранения';
const REMOVE_MOVIE_MSG = 'Фильм удален из сохраненных';
const MOVIE_NOT_FOUND_MSG = 'Фильм не найден!';
const USER_NOT_FOUND_MSG = 'Запрашиваемый пользователь не найден';
const EMAIL_IS_ALREADY_MSG = 'Такой email уже зарегистрирован в системе';
const USER_IS_REGISTERED_MSG = 'Пользователь зарегистрирован';
const AUTHORIZATION_IS_SUCCESSFUL = 'Авторизация успешна';
const TOKEN_REMOVE_MSG = 'Токен удален';
const NEED_AUTHORIZED_MSG = 'Необходима авторизация';
const INCORRECT_EMAIL_PASSWORD = 'Неправильные почта или пароль';
const PAGE_NOT_FOUND = 'Страница не найдена';
const INTERNAL_SERVER_ERROR = 'На сервере произошла ошибка';

const VALID_ERROR = 'ValidationError';
const CAST_ERROR = 'CastError';
const MONGO_SERVER_ERROR = 'MongoServerError';
const DUPLICATE_KEY = 'DuplicateKey';

// cors
const ALLOWED_CORS = [
  'https://mesto.shchetinkin.nomoredomains.club',
  'http://mesto.shchetinkin.nomoredomains.club',
  'https://localhost:3000',
  'http://localhost:3000',
];

// Methods
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

// Logs
const NAME_REQUEST_LOG = 'request.log';
const NAME_ERROR_LOG = 'error.log';

module.exports = {
  MONGO_URL,
  PORT,
  JWT_SECRET_DEV,
  NOT_FOUND_MOVIE_MSG,
  BAD_DATA_MSG,
  OTHER_PEOPLES_MOVIES_MSG,
  REMOVE_MOVIE_MSG,
  MOVIE_NOT_FOUND_MSG,
  VALID_ERROR,
  CAST_ERROR,
  USER_NOT_FOUND_MSG,
  MONGO_SERVER_ERROR,
  DUPLICATE_KEY,
  EMAIL_IS_ALREADY_MSG,
  USER_IS_REGISTERED_MSG,
  AUTHORIZATION_IS_SUCCESSFUL,
  TOKEN_REMOVE_MSG,
  NEED_AUTHORIZED_MSG,
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
  NAME_REQUEST_LOG,
  NAME_ERROR_LOG,
  INCORRECT_EMAIL_PASSWORD,
  PAGE_NOT_FOUND,
  INTERNAL_SERVER_ERROR,
};