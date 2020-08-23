const route = require('express').Router()
const UserController = require('../Controller/UserController')
const ProductController = require('../Controller/ProductController')
const { Authenticate } = require('../Middlewares/Auth')

route.post('/register', UserController.register)
route.post('/login', UserController.login)

route.use(Authenticate.Authenticate)
route.get('/products', ProductController.show)
route.post('/products', ProductController.add)
route.put('/products/:id', ProductController.update)
route.delete('/products/:id', ProductController.delete)


module.exports = route