const route = require('express').Router()
const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/ProductController')
const authenticate  = require('../middlewares/authenticate')
const authorization = require('../middlewares/authorization')

route.get('/', function(req, res) {
    res.status(200).json({ msg: 'welcome heroku' })
})

route.post('/login', UserController.login)

route.use(authenticate, authorization)
route.get('/products', ProductController.read)
route.post('/products', ProductController.create)
route.put('/products/:id', ProductController.update)
route.delete('/products/:id', ProductController.delete)

module.exports = route