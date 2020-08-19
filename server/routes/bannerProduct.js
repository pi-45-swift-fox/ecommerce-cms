const router = require('express').Router()
const bannerController = require('../controllers/BannerController')


router.post('/', bannerController.add)
router.get('/', bannerController.show)
router.get('/:id', bannerController.showById)
router.put('/:id', bannerController.update)
router.delete('/:id', bannerController.destroy)

module.exports = router