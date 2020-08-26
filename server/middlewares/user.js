const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = class Check {
    static async Authenticate(req, res, next) {
        try {
            const profile = jwt.verify(req.headers.access_token, process.env.SECRET);

            const data = await User.findOne({
                where: {
                    email: profile.email
                }
            });

            if (data) {
                req.userLogin = data;
                next();
            } else {
                throw 'Unable to find user';
            }
        } catch (error) {
            console.log(error);
            next({
                code: 403,
                type: 'token'
            })
        }
    }

    static async Authorize(req, res, next) {
        if (req.userLogin.role === 'admin') {
            next();
        } else {
            next({
                code: 403,
                type: 'token'
            });
        }
    }
};