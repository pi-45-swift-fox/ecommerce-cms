const {User} = require('../models')
const Helper = require('../helpers/Helper')

class UserController {
    static async login(req, res, next) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })

            if (user) {
                const verified = Helper.compareSync(req.body.password, user.password)

                if (verified) {
                    const access_token = Helper.sign({id: user.id, email: user.email})

                    res.status(200).json({access_token})
                } else {
                    next({message: 'invalid email or password'})
                }
            } else {
                next({message: 'invalid email or password'})
            }
        } catch(err) {
            next(err)
        }
    }
}

module.exports = UserController
