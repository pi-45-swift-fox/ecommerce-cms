const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authorization = require('../middlewares/authorization')

router.get('/', ProductController.list)
router.post('/',authorization, ProductController.create)
router.put('/:id',authorization, ProductController.edit)
router.delete('/:id', authorization, ProductController.delete)
router.get('/:id', ProductController.findOne)

module.exports = router