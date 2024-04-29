const router = require('express').Router();
const apiRoutes = require('./api');
const keys = require('../config/keys');

const { apiUrl } = keys.app;

const api = `/${apiUrl}`;

router.use(api, apiRoutes);
router.use(api, (req, res) => {
  res.status(404).json({ message: 'API route not found.' });
});

module.exports = router;
