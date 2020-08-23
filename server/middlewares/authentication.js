const { User } = require('../models')
const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
    console.log('masuk');
    try {
        if (!req.headers.access_token) {
            res.status(401).json({message: 'Not Authorized'})
        }
        const payload = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
        User.findOne({
            where: {
                email: payload.email
            }
        })
        .then((result) => {
            let user = result
            if (!user) {
                res.status(401).json({message: 'Not Authorized'})
            } else {
                req.userLogin = user
                next()
            }
        })
    } catch (error) {
        res.status(401).json({message: 'Not Authorized'})
    }

}

module.exports = authentication
