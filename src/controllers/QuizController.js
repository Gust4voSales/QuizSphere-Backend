const Quiz = require('../models/Quiz');

// index, show, store, update, destroy

module.exports = {
    async index(req, res) {
        try {
            const quizzes = await Quiz.find();
            
            return res.send({ quizzes });
        } catch (err){
            return res.status(400).send({ error: "Não foi possível listar os Quizzes. Tente novamente." });
        }
    },

    async store(req, res) {
        try {
            console.log(req.body);
            
            const quiz = await Quiz.create(req.body);
            
            return res.send({ quiz });
        } catch (err) {
            console.log(err);
            
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