const routes = require('express').Router()
const ProductController = require('../controllers/ProductController.js')
const Authorization = require('../middlewares/authorization')

routes.post('/', ProductController.addProduct)
routes.get('/', ProductController.getAllProducts)
routes.put('/:id', Authorization,ProductController.updateProduct)
routes.delete('/:id', Authorization ,ProductController.deleteProduct)

module.exports = routes