const router = require('express').Router()
const Controller = require('../controllers/controller')
const authentication = require('../middlewares/authentication')

router.post('/', Controller.create)
router.get('/', Controller.read)
router.put('/:id', authentication,Controller.update)
router.delete('/:id', authentication ,Controller.delete)

module.exports = router