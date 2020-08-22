const router = require('express').Router()
const productRoutes = require('./productRoutes')
const UserController = require('../controllers/UserController')
const errorHandler = require('../middlewares/errorhandler')
const authentication = require('../middlewares/authentication')

router.get('/', (req, res) => {
    res.send(`Welcome bruh`)
})
router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.use(authentication)
router.use('/products',productRoutes)
router.use(errorHandler)

module.exports = router