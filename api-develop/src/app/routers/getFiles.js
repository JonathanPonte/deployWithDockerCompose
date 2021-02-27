const express = require('express');
const router = express.Router();
const getFileController = require('../controllers/getFileController');



router.get('/image/:fileName', getFileController.getImage);


module.exports = app => app.use('/file', router);