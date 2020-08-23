const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    static login(req, res, next) {
        console.log('masuk login');
        
        User.findOne({where: {email: req.body.email}})
            .then(user => {
                console.log('cek email ada');
                
                if(!user) {
                    console.log('email tidak ada');
                    
                    return next({name: 'email or password is incorrect'})
                    // return res.status(400).json({msg: 'email or password is incorrect'})
                } else {
                    console.log('email ada');
                    
                    const verified = compare(req.body.password, user.password)
                    if(verified) {
                        console.log('password betul');
                        
                        const token = jwt.sign({id: user.id}, process.env.SECRET)
                        res.status(200).json({token})
                    } else {
                        console.log('password salah');
                        
                        next({name: 'email or password is incorrect'})
                        // res.status(400).json({msg: 'email or password is incorrect'})
                    }
                }
            })
            .catch(err => {
                console.log(err, 'masuk error');
                
                next(err)})
    }
}

module.exports = UserController