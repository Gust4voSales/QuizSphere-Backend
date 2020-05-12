const express = require('express');

const authMiddleware = require('./middlewares/auth');

const AuthController = require('./controllers/AuthController');
const QuizController = require('./controllers/QuizController');
const UserController = require('./controllers/UserController');
const UserActionsController = require('./controllers/UserActionsController');
const FriendRelationController = require('./controllers/FriendRelationController');

const router = express.Router()


router.post('/auth/register', AuthController.register);
router.post('/auth/authenticate', AuthController.authenticate);

router.get('/quiz', QuizController.index);
router.post('/quiz', authMiddleware, QuizController.store);
router.get('/quiz/:id', QuizController.show);

router.get('/user', UserController.index);
// router.put('/user', authMiddleware, UserController.update);

router.get('/user/quiz', authMiddleware, UserActionsController.index);
router.put('/user/quiz', authMiddleware, UserActionsController.update);
router.delete('/user/quiz/:quizId', authMiddleware, UserActionsController.destroy);


router.post('/user/addFriend/', authMiddleware, FriendRelationController.store);
router.put('/user/addFriend/:recipientId', authMiddleware, FriendRelationController.update);


module.exports = router;