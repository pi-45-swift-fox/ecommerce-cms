const { User } = require('../models')
const { decode } = require('jsonwebtoken')

function authentication (req, res, next) {
    try {
        if (req.headers.access_token) {
            let verify = decode(req.headers.access_token)
            if (verify) {
                User.findByPk(verify.id)
                    .then((data) => {
                        req.UserId = data.id
                        next()
                    })
                    .catch(err => {
                        next ({
                            status: 404,
                            type: "NotFound",
                            message: "Invalid User"
                        })
                    })
            } else {
                throw {
                    status: 401,
                    type: "Unauthentication",
                    message: "Not authentication to do the actions"
                }
            }
        }
    } catch(err) {
        next({ 
            status: 401,
            type: "Unauthentication",
            message: "Not authentication to do the actions" 
        })
    }

}

module.exports = authentication