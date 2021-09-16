require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const { MONGO_URL = 'mongodb://localhost:27017/moviesdb', PORT = 3000, INTERNAL_SERVER_ERROR } = require('./utils/constants');
const rateLimiter = require('./middlewares/rateLimit');

const app = express();

app.use(cors);
app.use(helmet());


mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);

app.use(rateLimiter);
app.use(router);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? INTERNAL_SERVER_ERROR
        : message,
    });

  next();
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
