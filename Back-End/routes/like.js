const express = require('express');
const router = express.Router();

const likeCtrl = require('../controller/like');
const auth = require('../middleware/auth');

router.get('/getLike',auth,likeCtrl.getLike);
router.post('/',auth,likeCtrl.like);

module.exports = router;