const { Product, User } = require('../models')

function authorization (req, res, next) {
    const id = req.UserId
    User.findByPk(id)
        .then(user => {
            if(user.role === 'admin') {
                return next()
            } else {
                next ({
                    type: "Unauthorized",
                    message: "Not authroized to do the actions",
                    status: 403
                })
            }
        })
        .catch((err) => {
            next({ 
                type: "Unauthorized",
                message: "Not authroized to do the actions",
                status: 403
             })
        })
}

module.exports = authorization