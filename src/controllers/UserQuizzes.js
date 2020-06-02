const Quiz = require('../models/Quiz');
const parseQuiz = require('./utils/parseQuiz');

module.exports = {
    async index(req, res) {
        try {
            const userId = req.userId;
            
            let quizzes = await Quiz.find({ author: userId },
                'quizTitle category author tags questionsLength time likes',
                {
                    lean: true,
                    populate: {
                        path: 'author',
                        select: 'userName'
                    },
                });            
            
            quizzes.map(quiz => {
                parseQuiz(userId, quiz);
            });

            return res.json({ quizzes: { docs: quizzes } }); // Later add pagination or even export to the QuizController index
        } catch (err){
            console.log(err);
            
            return res.status(400).send({ error: "Não foi possível listar os Quizzes. Tente novamente." });
        }
    },

}