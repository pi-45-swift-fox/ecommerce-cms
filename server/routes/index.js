const routes = require('express').Router()
const UserRoute = require('./UserRoute')
const ProductRoute = require('./ProductRoute')
const authenticate = require('../middlewares/authenticate')

routes.use('/login', UserRoute)

routes.use(authenticate)
routes.use('/products', ProductRoute)

module.exports = routes