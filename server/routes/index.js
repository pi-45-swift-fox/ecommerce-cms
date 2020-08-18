const router = require('express').Router();
const UserController = require('../Controller/UserController.js');
const ProductController = require('../Controller/ProductController.js');
const authentication = require('../helper/authentication.js');
const authorization = require('../helper/authorization.js');

router.post('/login', UserController.login);

router.use(authentication);
router.get('/products', ProductController.view);
router.post('/products', authorization, ProductController.post);
router.put('/products/:id', authorization, ProductController.update);
router.delete('/products/:id', authorization, ProductController.delete);

module.exports = router;
