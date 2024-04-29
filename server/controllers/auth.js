const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const keys = require('../config/keys');
const generateImage = require('../utils/imageGenerator');

const { secret, expiresIn } = keys.jwt;

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Either the password is incorrect or the user does not exist.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'Either the password is incorrect or the user does not exist.' });
    }
    const payload = {
      id: user.id
    };
    const token = jwt.sign(payload, secret, { expiresIn });
    res.status(200).json({
      token: `Bearer ${token}`,
      user
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const generatedImage = generateImage(name);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      image: generatedImage
    });
    const registeredUser = await user.save();
    const payload = {
      id: registeredUser.id
    };
    const token = jwt.sign(payload, secret, { expiresIn });
    res.status(200).json({
      token: `Bearer ${token}`,
      user: registeredUser
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const verifyToken = async (req, res) => {
  res.status(200).json({
    user: req.user
  });
};

module.exports = { login, register, verifyToken };
