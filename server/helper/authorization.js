module.exports = (req, res, next) => {
  if (req.userLogin.role != 'admin')
    return res.status(403).json({message: "INVALID_ACCESS"});
  return next();
}
