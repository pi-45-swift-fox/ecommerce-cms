const router = require('express').Router()
const productController = require('../controllers/ProductController')
const { authentication, authorization} = require('../middlewares/auth')

router.use(authentication)
router.post('/', productController.add)
router.get('/', productController.show)
router.get('/:id', productController.showById)
router.put('/:id', authorization,productController.update)
router.delete('/:id', authorization,productController.destroy)

module.exports = router