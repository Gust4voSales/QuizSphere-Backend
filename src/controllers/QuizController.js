const Quiz = require('../models/Quiz');

// index, show, store, update, destroy

module.exports = {
    async index(req, res) {
        try {
            const { page = 1, category } = req.query;
            
            const query = !!category ? { category } : { }; // If category has been requested, set the query to find by category, otherwise, set query to an empty obj.

            const quizzes = await Quiz.paginate(query, {
                page,
                limit: 8,
                select: 'quizTitle category author tags questionsLength',
                populate: {
                    path: 'author',
                    select: 'name -_id'
                }
            });            
            
            return res.json({ quizzes, });
        } catch (err){
            console.log(err);
            
            return res.status(400).send({ error: "Não foi possível listar os Quizzes. Tente novamente." });
        }
    },

    async store(req, res) {
        try {
            const { quizTitle, category, private, questions } = req.body;  
            const userId = req.userId;
            const questionsLength = questions.length;

            const quiz = await Quiz.create({
                quizTitle, 
                category, 
                private, 
                questions,
                questionsLength,
                author: userId,
            });
            
            return res.send({ quiz });
        } catch (err) {
            return res.status(400).send({ error: "Não foi possível cadastrar o Quiz. Tente novamente." });
        }
    },

    async show(req, res) {
        const id = req.params.id;

        try {
            const quiz = await Quiz.findById(id);
            
            if (!quiz)
                return res.status(404).send({ error: "Nenhum quiz cadastrado com esse id" });

            return res.send({ quiz });
        } catch (err) {
            return res.status(400).send({ error: "Não foi possível buscar as informações do Quiz. Tente novamente." });
        }
    },
}