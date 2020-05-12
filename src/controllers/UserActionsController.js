const User = require('../models/User');

module.exports ={ 
    async index(req, res) {
        try {
            const userId = req.userId;
            const { type } = req.query;

            if (type==='saved') {
                const quizzes = await User.findById(userId, 'savedQuizzes')
                    .populate({ 
                        path: 'savedQuizzes', 
                        model: 'Quiz',
                        select: '-category -questions -private -createdAt -updatedAt -__v',
                        populate: {
                            path: 'author',
                            select: 'userName -_id'
                        } 
                    });
                
                return res.json({ quizzes });
            }
        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: "Não foi possível listar os quizzes. Tente novamente." })
        }
    }, 

    async update(req, res) {
        try {
            const userId = req.userId;
            const { quizId } = req.body;

            const user = await User.findOneAndUpdate(
                { _id: userId }, 
                { $push: { savedQuizzes: quizId } },
                { runValidators: true, new: true },
            );

            user.__v = undefined;       
            user.createdAt = undefined;
            user.updatedAt = undefined;

            return res.json({ user, message: "Quiz salvo" });
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

            return res.json({ user, message: "Quiz removido dos quizzes salvos." });
        } catch(err) {
            console.log(err);
            return res.status(400).json({ error: "Não foi possível remover o quiz dos salvos. Tente novamente." });
        }
    }
}