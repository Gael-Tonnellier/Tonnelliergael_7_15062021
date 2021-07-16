const express = require('express');
const router = express.Router();

const publishCtrl = require('../controller/publications');
const auth = require('../middleware/auth');
const { route } = require('./user');

router.get('/getOlder:id',auth,publishCtrl.getOlder);
router.get('/last',auth,publishCtrl.getLast);
router.post('/create',auth,publishCtrl.create);
router.delete('/deletePost/:id',auth,publishCtrl.deletePost);
router.put('/updatePost/:id',auth,publishCtrl.updatePost);

module.exports = router;
