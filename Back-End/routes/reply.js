const express = require('express');
const router = express.Router();

const replyCtrl = require('../controller/reply');
const auth = require('../middleware/auth');


router.post('/createReply',auth,replyCtrl.createReply);
router.put('/updateReply/:id',auth,replyCtrl.updateReply);
router.delete('/deleteReply/:id',auth,replyCtrl.deleteReply);
router.get('/getReply',auth,replyCtrl.getReply);

module.exports = router;