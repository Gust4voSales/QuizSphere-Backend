const mongoose = require('mongoose');
const User = require('../models/User');
const parseQuiz = require('./utils/parseQuiz');

module.exports ={ 
    async index(req, res) {
        try {
            const userId = req.userId;
            const { page=1 } = req.query;
            
            const limit = 8;

            let totalDocs = await User.findById(userId, 'savedQuizzes');
            totalDocs = totalDocs.savedQuizzes.length;

            const quizzes = await User.findById(userId, 'savedQuizzes')
                .lean()
                .sort({ createdAt: -1 })
                .populate({                    
                    path: 'savedQuizzes', 
                    model: 'Quiz',
                    select: 'quizTitle tags questionsLength time author likes likeCounter',
                    options: {
                        skip: limit*(page-1),
                        limit,
                    },
                    populate: {
                        path: 'author',
                        model: 'User',
                        select: 'userName'
                    } 
            });
          
            quizzes.savedQuizzes.map(quiz => {
                parseQuiz(userId, quiz);
            })

            return res.json({ 
                quizzes: {
                    docs: quizzes.savedQuizzes.reverse(),
                    totalPages: Math.ceil(totalDocs/limit),
                } 
            }); 
        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: "Não foi possível listar os quizzes favoritados. Tente novamente." })
        }
    }, 

    async store(req, res) {
        try {
            const userId = req.userId;
            const { quizId } = req.params;

            const user = await User.findOneAndUpdate(
                { _id: userId }, 
                { $addToSet: { savedQuizzes: quizId } },
                { runValidators: true, new: true },
            );

            user.__v = undefined;       
            user.createdAt = undefined;
            user.updatedAt = undefined;

            return res.json({ user, message: "Quiz salvo nos favoritos" });
        } catch(err) {
            console.log(err);
            return res.status(400).json({ error: "Não foi possível favoritar o quiz. Tente novamente." });
        }
    },

    async destroy(req, res) {
        try{
            const userId = req.userId;
            const { quizId } = req.params;

            const user = await User.findByIdAndUpdate(
                { _id: userId },
                { $pull: { savedQuizzes: quizId } },
                { runValidators: true, new: true },
            );

            return res.json({ user, message: "Quiz removido dos favoritos" });
        } catch(err) {
            console.log(err);
            return res.status(400).json({ error: "Não foi possível remover o quiz dos favoritos. Tente novamente." });
        }
    }
}