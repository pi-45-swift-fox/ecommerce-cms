const jwt = require('jsonwebtoken')
const {User} = require('../models')

function authenticate(req,res,next){
    if(req.headers.access_token){
        const userLogin = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
        if(userLogin){
           User.findOne({
               where:{
                   email:userLogin.email
               }
           })
           .then(data=>{
               if(data.role == 'admin'){
                   req.userLogin = {
                       id:data.id,
                       role:data.role,
                       email:data.email
                   }
                   next()
               } else {
                   next({errCode:'FORBIDDEN', msg:['Not allowed. Only admin allowed']})
               }
           })
           .catch(err=>{
                next(err)
           })
        } 

    } else{
        next({errCode:'INVALID_ACCOUNT', msg:['Please login first']})
    }
}

module.exports = authenticate