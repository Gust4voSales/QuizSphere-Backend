const express = require('express');

const authMiddleware = require('./middlewares/auth');

const QuizController = require('./controllers/QuizController');
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');

const router = express.Router()

router.get('/quiz', QuizController.index);
router.post('/quiz', authMiddleware, QuizController.store);
router.get('/quiz/:id', QuizController.show);

router.get('/user', UserController.index);
router.put('/user', authMiddleware, UserController.update);

router.post('/auth/register', AuthController.register);
router.post('/auth/authenticate', AuthController.authenticate);

module.exports = router;