const express = require('express');
const router = express.Router();
const CommumUserController = require('../controllers/CommumUserController');
const authmiddleware = require('../middlewares/authCommumUser');
const superAdmController = require('../controllers/superAdmController');

router.use(authmiddleware);

// Rota de resposta de escala usuario commum
router.post('/scale', CommumUserController.answerScale);

// router.get('/:scale/:people', CommumUserController.getAnswerOfPeople);

router.get('/:scale/:people', CommumUserController.getScale);

router.get('/scale', CommumUserController.listScalesUser);

router.get('/:scale', CommumUserController.listScaleWithQuestions);

module.exports = app => app.use('/api/user', router);