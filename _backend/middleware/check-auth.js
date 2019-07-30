const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, 'generations_pass_here_some_they_rise_some_they_fall');
    next();
  } catch (error) {
      res.status(401).json({ message: "Auth failed!"});
  }
};
