const User = require('../models/User');

module.exports = {
    async index(req, res) {
        try {
            const { page=1, userName } = req.query;
            const regexExpression = new RegExp(userName, "i"); //Find similar users
            
            const users = await User.paginate({ userName: regexExpression }, {
                page,
                limit: 10,
            });

            return res.json({ users });
        } catch(err) {
            return res.status(400).json({ error: "Não foi possível buscar por usuário. Tente novamente." });
        }
    },

    async show(req, res) {

    },

    async update(req, res) {
        try {
            const userId = req.userId;
            const { quizId } = req.body;

            await User.findOneAndUpdate(
                { _id: userId }, 
                { $push: { savedQuizzes: quizId } },
                { runValidators: true },
            );

            res.json({ message: "Quiz salvo" });
        } catch(err) {
            res.status(400).json({ error: "Não foi possível salvar o quiz. Tente novamente." });
        }
    }   
}