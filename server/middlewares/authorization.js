// const { User } = require('../models')

function authorization (req, res, next) {
    if(req.user.role == 'admin') {
        next()
    } else {
        next({name: 'Not Authorized'})
    }
}

module.exports = authorization