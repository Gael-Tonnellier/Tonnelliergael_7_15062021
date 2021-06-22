const express = require('express');
const router = express.Router();

const publishCtrl = require('../controller/publications');
const auth = require('../middleware/auth');

router.get('/', publishCtrl.getAll);
router.post('/create',publishCtrl.create);

module.exports = router;
