const express = require('express');
const router = express.Router();

const publishCtrl = require('../controller/publications');
const auth = require('../middleware/auth');
const { route } = require('./user');

router.get('/', publishCtrl.getAll);
router.get('/getReply',publishCtrl.getReply);
router.post('/create',publishCtrl.create);
router.get('/getLike',publishCtrl.getLike);
router.post('/like',publishCtrl.like);

module.exports = router;
