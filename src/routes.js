const express = require('express');
const router = express.Router();

const authMiddleware = require('./middlewares/auth');
const registerInputValidationMiddleware = require('./middlewares/registerInputValidation');
const createQuizValidationMiddleware = require('./middlewares/createQuizValidation');

const AuthController = require('./controllers/AuthController');
const QuizController = require('./controllers/QuizController');
const LikeQuizController = require('./controllers/LikeQuizController');
const UserController = require('./controllers/UserController');
const UserShareQuiz = require('./controllers/UserShareQuiz');
const UserFavoriteQuizzes = require('./controllers/UserFavoriteQuizzesController');
const ActivitiesController = require('./controllers/ActivitiesController');
const FriendRelationController = require('./controllers/FriendRelationsControllers/FriendRelationController');
const FriendInvitationsController = require('./controllers/FriendRelationsControllers/FriendInvitationsController');
const AcceptFriendInvitationController = require('./controllers/FriendRelationsControllers/AcceptFriendInvitationController');
const DeclineFriendInvitationController = require('./controllers/FriendRelationsControllers/DeclineFriendInvitationController');


router.post('/auth/register', registerInputValidationMiddleware, AuthController.register);
router.post('/auth/authenticate', AuthController.authenticate);

router.get('/quiz', authMiddleware, QuizController.index);
router.post('/quiz', authMiddleware, createQuizValidationMiddleware, QuizController.store);
router.get('/quiz/:id', authMiddleware, QuizController.show);

router.post('/quiz/:quizId/like', authMiddleware, LikeQuizController.store);
router.delete('/quiz/:quizId/deslike', authMiddleware, LikeQuizController.destroy);

router.get('/user/savedQuizzes', authMiddleware, UserFavoriteQuizzes.index);
router.post('/user/savedQuizzes/:quizId', authMiddleware, UserFavoriteQuizzes.store);
router.delete('/user/savedQuizzes/:quizId', authMiddleware, UserFavoriteQuizzes.destroy);

router.get('/shareQuiz', authMiddleware, UserShareQuiz.index);
router.post('/shareQuiz/:quizId', authMiddleware, UserShareQuiz.store);

router.get('/user/notifications', authMiddleware, ActivitiesController.index);
router.put('/user/notifications/setSeenActivities', authMiddleware, ActivitiesController.update);

router.get('/user/friend', authMiddleware, FriendRelationController.index);
router.post('/user/friend', authMiddleware, FriendRelationController.store);
router.delete('/user/friend/:relationId', authMiddleware, FriendRelationController.destroy);

router.get('/user/friend/pendingInvitations', authMiddleware, FriendInvitationsController.index);

router.post('/user/friend/acceptInvitation/:recipientId', authMiddleware, AcceptFriendInvitationController.store);
router.post('/user/friend/declineInvitation/:recipientId', authMiddleware, DeclineFriendInvitationController.store);

router.get('/user', UserController.index);
router.get('/user/:id', authMiddleware, UserController.show);


module.exports = router;