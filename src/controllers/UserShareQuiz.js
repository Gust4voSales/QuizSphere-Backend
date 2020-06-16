const User = require('../models/User');
const Quiz = require('../models/Quiz');
const ActivitiesNotifications = require('../models/ActivitiesNotifications');
const parseQuiz = require('./utils/parseQuiz');

async function createNotification(friendId, quizId, userName) {
    try {
        await ActivitiesNotifications.create({
            recipientUser: friendId,
            friendName: userName,
            quizId,
            activityType: 'sharedQuiz',
        });

    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    async index(req, res) {
        try {
            const userId = req.userId;
            const { page=1 } = req.query;
            
            const limit = 8;

            let totalDocs = await User.findById(userId, 'sharedQuizzes'); //change to received quizzes
            totalDocs = totalDocs.sharedQuizzes.length;

            const user = await User.findById(userId, 'sharedQuizzes')
                .lean()
                .sort({ createdAt: -1 })
                .populate({                    
                    path: 'sharedQuizzes.quiz', 
                    model: 'Quiz',
                    options: {
                        skip: limit*(page-1),
                        limit: limit,
                    },
                    select: 'quizTitle tags questionsLength time author likes likeCounter',
                    populate: {
                        path: 'author',
                        model: 'User',
                        select: 'userName'
                    } 
                })
                .populate({
                    path: 'sharedQuizzes.user', 
                    model: 'User',
                    // options: {
                        // skip: limit*(page-1),
                        // limit: limit,
                    // },
                    select: 'userName',
                });

            let quizzes = { sharedQuizzes: [] };

            user.sharedQuizzes.map((sharedQuizObj, index) => {
                if (sharedQuizObj.quiz===null)
                    return;
                quizzes.sharedQuizzes.push(sharedQuizObj);
            });
            
            if (!quizzes) {
                console.log('null');
                
                return res.json({ 
                    quizzes: { docs: [], totalPages: 0 } 
                });
            }
            
            quizzes.sharedQuizzes.map(sharedQuizObj => {
                parseQuiz(userId, sharedQuizObj.quiz);
            })

            return res.json({ 
                quizzes: {
                    docs: quizzes.sharedQuizzes.reverse(),
                    totalPages: Math.ceil(totalDocs/limit),
                } 
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: "Não foi possível listar os quizzes recebidos." });
        }
    },

    async store(req, res) {
        try {
            const userId  = req.userId;
            const { quizId } = req.params;
            const { friendsIds, userName } = req.body;

            const quiz = await Quiz.findById(quizId, 'author private');

            for (let friendId of friendsIds) {
                let notify = true;
                
                if (quiz.private && userId!=quiz.author) {
                    return res.status(400).json({ error: "Apenas o autor pode compartilhar um quiz privado" });
                }

                const friend = await User.findByIdAndUpdate(
                    friendId, 
                    { $addToSet: {sharedQuizzes: {
                        quiz: quizId,
                        user: userId,
                    }} },
                );

                // if the user has already shared this quiz with the same user then don't notify anymore
                friend.sharedQuizzes.map(sharedQuizObj => {
                    if (sharedQuizObj.quiz==quizId && sharedQuizObj.user==userId) {
                        notify = false;
                        return;
                    }
                })
                if (!notify) {
                    continue
                }

                // add notification
                await createNotification(friendId, quizId, userName);

                // send socket 
                const ownerSocketRecipient = req.connectedUsers[friendId];        
                // If the user is connected send the sharedQuiz event via socket
                if (ownerSocketRecipient) {
                    req.io.to(ownerSocketRecipient).emit('new_activity', { type: 'shared' });
                } 
            }

            return res.json({ message: 'Quiz compartilhado com sucesso' });
        } catch(err) {
            console.log(err);
            return res.status(400).json({ error: "Não foi possível compartilhar o quiz." });
        }
    },
}