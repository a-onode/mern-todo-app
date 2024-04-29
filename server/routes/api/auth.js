const router = require('express').Router();

const authController = require('../../controllers/auth');
const validate = require('../../middleware/authValidator');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

router.post('/login', authController.login);

router.post('/register', validate, authController.register);

router.post('/verify-token', verifyAccessToken, authController.verifyToken);

module.exports = router;
