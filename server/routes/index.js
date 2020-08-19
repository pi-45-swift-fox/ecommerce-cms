const router = require('express').Router()
const userRoute = require('./userRoute')
const productRoute = require('./productRoute')
const bannerRoute = require('./bannerProduct')

router.use('/', userRoute)
router.use('/products', productRoute)
router.use('/banners', bannerRoute)

module.exports = router 