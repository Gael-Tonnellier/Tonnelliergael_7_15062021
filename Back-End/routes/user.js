const express = require('express');
const router = express.Router();

const rate = require('../middleware/rate_limit.js');
const userCtrl = require('../controller/user');
const auth = require('../middleware/auth');

router.post('/signup' , userCtrl.signup);
router.post('/login' ,rate, userCtrl.login);
router.get('/info/:id',auth,userCtrl.info);
router.get('/',auth,userCtrl.getAllUsers);
router.delete('/delete/:id',auth,userCtrl.delete);
router.put('/update/:id',auth,userCtrl.update)
module.exports = router;