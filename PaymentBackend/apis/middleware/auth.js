const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // const token = req.headers.authorization.split(' ')[1];
 
    const decodedToken = jwt.verify(token, process.env.JWT_SESSION_KEY);
    console.log('approved');
      next();
  } catch {
    res.status(401).json({
        error: 'Auhorization error! please send a valid token via authorization header!'
        });
  }
};