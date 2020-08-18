const { Product } = require('../models')

function authorization(req,res,next){
    const id = req.params.id
    Product.findByPk(id)
        .then(data=>{
            if(!data){
                next({errCode:'NOT_FOUND'})
            } else {
                if(data.UserId == req.userLogin.id){
                    next()
                } else{
                    next({errCode:'FORBIDDEN'})
                }
            }
            
        })
        .catch(err=>{
            next(err)
        })
}

module.exports = authorization