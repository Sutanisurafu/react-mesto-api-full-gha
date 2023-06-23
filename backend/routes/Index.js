const router = require('express').Router();
const NotFoundError = require('../errors/Not-found');
const { signUpValidation, signInValidation } = require('../middlewares/validators');

const userRouter = require('./users');
const cardRouter = require('./cards');

const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');

router.post('/signin', signInValidation, login);
router.post('/signup', signUpValidation, createUser);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);

router.use('*', auth, (res, req, next) => {
  next(new NotFoundError('Запрашиваемая страница не существует'));
});

module.exports = router;
