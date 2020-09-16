const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = (req, res, next) => {
  if (!req.headers.access_token)
    return res.status(401).json({message: "INVALID_ACCESS"});

  try
  {
    console.log(req.headers.access_token);
    const userData = jwt.verify(req.headers.access_token, process.env.JWT_SECRET);
    User.findOne({where: {email: userData.email}})
      .then(data => {
        if (!data)
          return res.status(404).json({message: "user not found"});
        req.userLogin = userData;
        return next()
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      })
  }
  catch (err)
  {
    return res.status(401).json(err);
  }
}
