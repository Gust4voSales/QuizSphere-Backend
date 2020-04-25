const express = require('express');

const authMiddleware = require('./middlewares/auth');

const QuizController = require('./controllers/QuizController');
const AuthController = require('./controllers/AuthController');

const router = express.Router()

router.get('/quiz', authMiddleware, QuizController.index);
router.post('/quiz', QuizController.store);
router.get('/quiz/:id', QuizController.show);

router.post('/auth/register', AuthController.register);
router.post('/auth/authenticate', AuthController.authenticate);

module.exports = router;