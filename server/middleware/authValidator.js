const { check, validationResult } = require('express-validator');

const User = require('../models/user');

const nameValidation = () => [
  check('name').not().isEmpty().trim().withMessage('Name is required.'),
  check('name')
    .isLength({ min: 2, max: 30 })
    .withMessage('Name must be between 2 and 30 characters.')
];

const emailValidation = () => [
  check('email').isEmail().normalizeEmail().withMessage('Email is not valid.'),
  check('email').custom(value => {
    return User.findOne({ email: value }).then(user => {
      if (user) {
        return Promise.reject(new Error('Email already used.'));
      }
    });
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  }
];

const passwordValidation = () => [
  check('password').not().isEmpty().withMessage('Password is required.'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.')
];

const validate = [...nameValidation(), ...emailValidation(), ...passwordValidation()];

module.exports = validate;
