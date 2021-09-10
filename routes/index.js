const router = require('express').Router()
const userRouter = require('./users')
const movieRouter = require('./movies')

const auth = require('../middlewares/auth')

const NotFoundError = require('../errors/not-found-err')

const {createUser, login} = require('../controllers/users')

router.post('/signup', createUser)
router.post('/signin', login)

router.use(auth)

router.use(userRouter)
router.use(movieRouter)

router.use((req,res,next) =>  next (new NotFoundError('Страница не найдена !')))

module.exports = router