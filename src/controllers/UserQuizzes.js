const Quiz = require('../models/Quiz');

module.exports = {
    async index(req, res) {
        try {
            const userId = req.userId;
            
            const quizzes = await Quiz.find({ author: userId },
                'quizTitle category author tags questionsLength time',
                {
                populate: {
                    path: 'author',
                    select: 'userName'
                }
                });            
            
            return res.json({ quizzes: { docs: quizzes } }); // Later add pagination or even export to the QuizController index
        } catch (err){
            console.log(err);
            
            return res.status(400).send({ error: "Não foi possível listar os Quizzes. Tente novamente." });
        }
    },

}