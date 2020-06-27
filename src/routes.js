const express = require("express");
const router = express.Router();

const authMiddleware = require("./middlewares/auth");
const registerInputValidationMiddleware = require("./middlewares/registerInputValidation");
const createQuizValidationMiddleware = require("./middlewares/createQuizValidation");

const AuthController = require("./controllers/AuthController");
const QuizController = require("./controllers/QuizController");
const LikeQuizController = require("./controllers/LikeQuizController");
const UserController = require("./controllers/UserController");
const UserShareQuiz = require("./controllers/UserShareQuiz");
const UserFavoriteQuizzes = require("./controllers/UserFavoriteQuizzesController");
const ActivitiesController = require("./controllers/ActivitiesController");
const FriendRelationController = require("./controllers/FriendRelationsControllers/FriendRelationController");
const FriendInvitationsController = require("./controllers/FriendRelationsControllers/FriendInvitationsController");
const AcceptFriendInvitationController = require("./controllers/FriendRelationsControllers/AcceptFriendInvitationController");
const DeclineFriendInvitationController = require("./controllers/FriendRelationsControllers/DeclineFriendInvitationController");

// create a user
router.post(
  "/users/register",
  registerInputValidationMiddleware,
  AuthController.register
);

// check this routes. Should not use auth?
router.get("/users", UserController.index);
router.get("/quiz/list", QuizController.index);

router.post("/auth/login", AuthController.authenticate);

// routes that need auth
router.use(authMiddleware);

// users
router.get("/users/:id", UserController.show);

// quiz - create
router.post(
  "/quiz/create",
  createQuizValidationMiddleware,
  QuizController.store
);

// quiz - show
router.get("/quiz/show/:id", QuizController.show);

// quiz - saves
router.post("/quiz/saved/add/:quizId", UserFavoriteQuizzes.store);
router.delete("/quiz/saved/remove/:quizId", UserFavoriteQuizzes.destroy);
router.get("/quiz/saved", UserFavoriteQuizzes.index);

// quiz - likes
router.post("/quiz/:quizId/like", LikeQuizController.store);
router.delete("/quiz/:quizId/dislike", LikeQuizController.destroy);

// quiz - share
router.post("/quiz/share/:quizId", UserShareQuiz.store);
router.get("/quiz/received", UserShareQuiz.index);

// friends - list all
router.get("/friends", FriendRelationController.index);

//friends - list requests
router.get("/friends/pendingInvitations", FriendInvitationsController.index);

// friends - add/remove
router.post("/friends/add", authMiddleware, FriendRelationController.store);
router.delete("/friends/remove/:relationId", FriendRelationController.destroy);

// friends - accept / decline
router.post(
  "/friends/accept/:recipientId",
  AcceptFriendInvitationController.store
);
router.post(
  "/friends/decline/:recipientId",
  DeclineFriendInvitationController.store
);

// notifications
router.get("/notifications", ActivitiesController.index);
router.put("/notifications/setasread", ActivitiesController.update);

module.exports = router;
