const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const CommumUserController = require('../controllers/CommumUserController');
const configFace = require('../../modules/facebook/facebookConfig')


router.post('/register', authController.registerUser);

router.post('/login', authController.login);

router.get('/categorys', authController.listCategorys);

router.get('/escales', authController.listScales);

router.get('/image/:fileName', authController.getImage);

router.get('/scale', CommumUserController.listScalesUser);

router.get('/facebook', passport.authenticate('facebook'));

router.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: 'http://localhost:3000/auth',
        failureRedirect: 'http://localhost:3000/auth/fail'
    })
);


router.get('/fail', (req, res) => {
    res.send("Failed attempt");
});

router.get('/', (req, res) => {
    console.log(req);
    res.send("Success");
});



module.exports = app => app.use('/api/auth', router);