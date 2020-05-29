const express = require('express');
const router = express.Router();

const authMiddleware = require('./middlewares/auth');
const AuthController = require('./controllers/AuthController');
const QuizController = require('./controllers/QuizController');
const UserController = require('./controllers/UserController');
const UserQuizzes = require('./controllers/UserQuizzes');
const UserSavedQuizzesController = require('./controllers/UserSavedQuizzesController');
const ActivitiesController = require('./controllers/ActivitiesController');
const FriendRelationController = require('./controllers/FriendRelationsControllers/FriendRelationController');
const FriendInvitationsController = require('./controllers/FriendRelationsControllers/FriendInvitationsController');
const AcceptFriendInvitationController = require('./controllers/FriendRelationsControllers/AcceptFriendInvitationController');
const DeclineFriendInvitationController = require('./controllers/FriendRelationsControllers/DeclineFriendInvitationController');



router.post('/auth/register', AuthController.register);
router.post('/auth/authenticate', AuthController.authenticate);

router.get('/quiz', QuizController.index);
router.post('/quiz', authMiddleware, QuizController.store);
router.get('/quiz/:id', QuizController.show);

router.get('/user/savedQuizzes', authMiddleware, UserSavedQuizzesController.index);
router.post('/user/savedQuizzes/:quizId', authMiddleware, UserSavedQuizzesController.store);
router.delete('/user/savedQuizzes/:quizId', authMiddleware, UserSavedQuizzesController.destroy);

router.get('/user/notifications', authMiddleware, ActivitiesController.index);
router.put('/user/notifications/setSeenActivities', authMiddleware, ActivitiesController.update);

router.get('/user/quiz', authMiddleware, UserQuizzes.index);

router.post('/user/friend', authMiddleware, FriendRelationController.store);
router.get('/user/friend/pendingInvitations', authMiddleware, FriendInvitationsController.index);

router.post('/user/friend/acceptInvitation/:recipientId', authMiddleware, AcceptFriendInvitationController.store);
router.post('/user/friend/declineInvitation/:recipientId', authMiddleware, DeclineFriendInvitationController.store);

router.get('/user', UserController.index);
router.get('/user/:id', authMiddleware, UserController.show);


module.exports = router;