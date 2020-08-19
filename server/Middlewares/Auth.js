const {User} = require('../models')
const {JWT} = require('../helpers')

class Authenticate{

    static async Authenticate(req, res, next){
        try{

            if(!req.headers.access_token){
                return next({errorCode : 'INVALID_TOKEN'})
            }

            const check = JWT.verifyToken(req.headers.access_token)

            if(check){
                req.userLogin = {id:check.id, email:check.email}
                next()
            }

        }catch(err){

            next({errorCode : "INVALID_USER"})

        }


    }

}

class Authorize{



}

module.exports = {Authenticate, Authorize}