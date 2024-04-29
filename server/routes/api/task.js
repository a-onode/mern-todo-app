const router = require('express').Router();

const taskController = require('../../controllers/task');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

router.get('/index', verifyAccessToken, taskController.index);

router.post('/store', verifyAccessToken, taskController.store);

router.put('/update/:id', verifyAccessToken, taskController.update);

router.delete('/destroy/:id', verifyAccessToken, taskController.destroy);

module.exports = router;
