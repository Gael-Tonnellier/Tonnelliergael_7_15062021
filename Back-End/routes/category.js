const express = require('express');
const router = express.Router();

const categoryCtrl = require('../controller/category');
const auth = require('../middleware/auth');

router.get('/getCategory',auth,categoryCtrl.getCategory);
router.post('/createCategory',auth,categoryCtrl.createCategory);
router.delete('/deleteCategory',auth,categoryCtrl.deleteCategory)

module.exports = router;