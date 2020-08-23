const route = require('express').Router()
const Controller = require('../controllers')
const authentication = require('../middlewares/authentication')

route.post('/login', Controller.login)
route.get('/products', Controller.read)

route.post('/products', authentication, Controller.create)
route.get('/products/:id', authentication, Controller.readOne)
route.put('/products/:id', authentication, Controller.update)
route.delete('/products/:id', authentication, Controller.delete)



module.exports = route