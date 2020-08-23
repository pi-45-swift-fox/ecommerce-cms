const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const Middleware = require('../middleware/Middleware')

router.use(Middleware.authentication)
router.use(Middleware.authorization)

router.get('/', ProductController.show)
router.post('/', ProductController.add)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)

module.exports = router
