const mongoose = require('mongoose');
const User = require('../models/User');
const parseQuiz = require('./utils/parseQuiz');

module.exports ={ 
    async index(req, res) {
        try {
            const userId = req.userId;
            const { page=1 } = req.query;
            
            const limit = 8;

            let totalPages = await User.findById(userId, 'savedQuizzes');
            totalPages = totalPages.savedQuizzes.length;

            const quizzes = await User.findById(userId, 'savedQuizzes')
                .lean()
                .sort({ createdAt: -1 })
                .populate({                    
                    path: 'savedQuizzes', 
                    model: 'Quiz',
                    select: 'quizTitle tags questionsLength time author likes',
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
          
            console.log(quizzes.savedQuizzes.length);
            
            quizzes.savedQuizzes.map(quiz => {
                parseQuiz(userId, quiz);
            })

            return res.json({ 
                quizzes: {
                    docs: quizzes.savedQuizzes,
                    totalPages,
                } 
            }); 
        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: "Não foi possível listar os quizzes salvos. Tente novamente." })
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
            return res.status(400).json({ error: "Não foi possível salvar o quiz. Tente novamente." });
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
            return res.status(400).json({ error: "Não foi possível remover o quiz dos salvos. Tente novamente." });
        }
    }
}