const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  static login(req, res, next)
  {
    User.findOne({where: {email: req.body.email}})
      .then(data => {
        if (!data)
          return res.status(404).json({message: "there is no user with that email"});

        if (bcrypt.compareSync(req.body.password, data.password))
        {
          const token = jwt.sign({id: data.id, email: data.email, role: data.role}, process.env.JWT_SECRET)
          return res.status(200).json({access_token: token, email: data.email});
        }
        else
          return res.status(401).json({ message: "username or password is wrong"});
      })
      .catch(err => {
        return res.status(500).json(err);
      })
  }
}

module.exports = UserController;
