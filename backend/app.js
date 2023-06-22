/* eslint-disable no-useless-escape */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const NotFoundError = require('./errors/Not-found');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { signUpValidation, signInValidation } = require('./middlewares/validators');

const { PORT = 3000 } = process.env;

const app = express();
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.post('/signin', signInValidation, login);
app.post('/signup', signUpValidation, createUser);

app.use(errorLogger);

app.use('*', auth, (res, req, next) => {
  next(new NotFoundError('Запрашиваемая страница не существует'));
});

mongoose
  .connect('mongodb://0.0.0.0:27017/mestodb', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Подключены к БД');
  })
  .catch((error) => {
    console.log(error);
  });

app.use(errors());

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log('Server is running on 3000 PORT');
});
