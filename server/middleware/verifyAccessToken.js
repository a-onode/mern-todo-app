const jwt = require('jsonwebtoken');

const User = require('../models/user');
const keys = require('../config/keys');

const { secret } = keys.jwt;

const verifyAccessToken = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(401).json({ message: 'Token is not provided.' });
    }
    const token = bearerToken.split(' ')[1];
    const decodedToken = jwt.verify(token, secret);
    if (!decodedToken) {
      return res.status(401).json({ message: 'Token is invalid.' });
    }
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token verification failed.' });
  }
};

module.exports = verifyAccessToken;
