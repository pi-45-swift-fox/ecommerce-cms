const router = require('express').Router()
const userRouter = require('./userRoute')
const productRouter = require('./productRoute')

router.use('/', userRouter)

router.use('/products', productRouter)

module.exports = router