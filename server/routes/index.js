const router = require('express').Router()
const User = require('./user')
const Product = require('./product')
const authenticate = require('../middlewares/authentication')

router.use('/login', User)
router.use(authenticate)
router.use('/products', Product)

module.exports = router