const express = require('express');
const router = express.Router();

const authMiddleware = require('./middlewares/auth');
const AuthController = require('./controllers/AuthController');
const QuizController = require('./controllers/QuizController');
const UserController = require('./controllers/UserController');
const UserSavedQuizzesController = require('./controllers/UserSavedQuizzesController');
const NotificationsController = require('./controllers/NotificationsController');
const FriendRelationController = require('./controllers/FriendRelationController');
const AcceptFriendInvitationController = require('./controllers/AcceptFriendInvitationController');
const DeclineFriendInvitationController = require('./controllers/DeclineFriendInvitationController');



router.post('/auth/register', AuthController.register);
router.post('/auth/authenticate', AuthController.authenticate);

router.get('/quiz', QuizController.index);
router.post('/quiz', authMiddleware, QuizController.store);
router.get('/quiz/:id', QuizController.show);

router.get('/user/savedQuizzes', authMiddleware, UserSavedQuizzesController.index);
router.post('/user/savedQuizzes/:quizId', authMiddleware, UserSavedQuizzesController.store);
router.delete('/user/savedQuizzes/:quizId', authMiddleware, UserSavedQuizzesController.destroy);

router.get('/user/notifications', authMiddleware, NotificationsController.index);
router.get('/user/notifications/info', authMiddleware, NotificationsController.show);
router.put('/user/notifications/setSeenActivities', authMiddleware, NotificationsController.update);

router.post('/user/friend', authMiddleware, FriendRelationController.store);

router.post('/user/friend/acceptInvitation/:recipientId', authMiddleware, AcceptFriendInvitationController.store);
router.post('/user/friend/declineInvitation/:recipientId', authMiddleware, DeclineFriendInvitationController.store);

router.get('/user', UserController.index);
router.get('/user/:id', UserController.show);


module.exports = router;