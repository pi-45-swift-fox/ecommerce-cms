const {User} = require('../models')
const {JWT, Bcrypt} = require('../helpers')

class UserController{

    static async register(req, res, next){
        try{
            const {email, password} = req.body
            let role = 'User'
            
            const newUser = await User.create({email,password,role})
            if(newUser) {
                return res.status(201).json({email:newUser.email, role: newUser.role, message:"Success Register"})
            }
            
        }catch(err){
            // console.log(err, '<========================================')
            next(err)
        }
        
    }

    static async login(req, res, next){
        try{
            // console.log(req.body)
            const {email, password} = req.body
            let role = "User"
            
            const user = await User.findOne({where: {email}})
            if(!email){
                next({errorCode : 'INVALID_USER'})
            }
            else{
                const userPassword = await Bcrypt.decrypt(password, user.password)
                if(!userPassword){
                    next({errorCode : 'INVALID_USER'})
                }
                else{
                    const token = JWT.generateToken(user)
                    res.status(200).json({id:user.email, role:user.role ,token})
                }
            }

        }catch(err){
           
            next(err)

        }
    }
}

module.exports = UserController