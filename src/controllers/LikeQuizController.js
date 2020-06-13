const Quiz = require('../models/Quiz');

module.exports = {
    async store(req, res) {
        const userId = req.userId;
        const { quizId } = req.params;

        try {
            await Quiz.findByIdAndUpdate(
                { _id: quizId }, 
                { 
                    $addToSet: { likes: userId },
                    $inc: { likeCounter: 1 }
                },
            );

            return res.json({ message: "Like confirmado" });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: "Erro ao tentar dar like" })
        }
    },

    async destroy(req, res) {
        const userId = req.userId;
        const { quizId } = req.params;

        try {
            await Quiz.findByIdAndUpdate(
                { _id: quizId }, 
                { 
                    $pull: { likes: userId },
                    $inc: { likeCounter: -1 }
                },
            );

            return res.json({ message: "Deslike confirmado" });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: "Erro ao tentar dar deslike" })
        }
    }
}