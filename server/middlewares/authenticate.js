const jwt = require('jsonwebtoken')
const { User } = require('../models')

function authenticate (req, res, next) {
    if(!req.headers.accesstoken) {
        return next({name: 'Not Authorized'})
    } 
    try {
        const userToken = jwt.verify(req.headers.accesstoken, process.env.SECRET)
        User.findOne({where: {id: userToken.id}})
            .then(user => {
                if (!user) {
                    next({name: 'Not Authorized'})
                } else {
                    req.user = user.dataValues
                    next()
                }
            })
    } catch (err) {
        next(err)
    }
}

module.exports = authenticate