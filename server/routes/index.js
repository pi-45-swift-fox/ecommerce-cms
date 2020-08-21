const router = require('express').Router();
const Controller = require('../controllers');
const Check = require('../middlewares/user');

router.post('/login', Controller.login);
router.get('/products', Controller.getProducts);
router.post('/products', Check.Authenticate, Check.Authorize, Controller.addProduct);
router.get('/products/:id', Controller.detailProduct);
router.delete('/products/:id', Check.Authenticate, Check.Authorize, Controller.delProduct);
router.put('/products/:id', Check.Authenticate, Check.Authorize, Controller.updateProduct);

module.exports = router;