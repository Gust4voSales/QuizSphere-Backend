const Quiz = require('../models/Quiz');
const parseQuiz = require('./utils/parseQuiz');

// index, show, store, update, destroy

function parseTime(strTime) {
    if (strTime.length===5) { // 1 min ou 2 min
        return parseInt(strTime.slice(0));
    } else if (strTime.length===6) { //10 min ou 15 min ou 30 min
        return parseInt(strTime.slice(0, 2));
    } else if (strTime.length===8) { // 1:30 min ou 2:30 min
        if (strTime==='1:30 min') return 1.5;
        if (strTime==='2:30 min') return 2.5;
    } else throw Error('Time not valid');
}

module.exports = {
    async index(req, res) {
        try {
            const userId = req.userId;
            const { page=1, category=null, author=false, title=null, tag=null } = req.query;

            // FILTERS
            if (category) 
                query = { private: false, category }; // Don't show private Quizzes on the Feed
            else if (author) 
                query = { author: userId } // Created quizzes query
            else if (title) {
                const regexExpression = new RegExp(title, "i"); //Find Quizzes with similar names to the one passed

                query = { private: false, quizTitle: regexExpression }
            }
            else if (tag) {
                const regexExpression = new RegExp(tag, "i"); //Find Quizzes with similar names to the one passed

                query = { private: false, tags: { $in: [regexExpression]} } 
            }
            else {
                query = {}
            }

            let quizzes = await Quiz.paginate(query, {
                page,
                limit: 8, // 10? 
                sort: author ? { createdAt: -1 } : { likeCounter: -1 } ,
                select: 'quizTitle category author tags questionsLength time likes likeCounter private',
                populate: {
                    path: 'author',
                    select: 'userName'
                },
                lean: true,
            });            

            quizzes.docs.map(quiz => {
                parseQuiz(userId, quiz);
            })
           
            setTimeout(() => {
                return res.json({ quizzes });
            }, 2000)
        } catch (err){
            console.log(err);
            
            return res.status(400).send({ error: "Não foi possível listar os Quizzes. Tente novamente." });
        }
    },

    async store(req, res) {
        try {
            const userId = req.userId;
            const { quizTitle, category, private, questions, time, tags=[] } = req.body;  
            
            const questionsLength = questions.length;
            const parsedTime = parseTime(time);

            const quiz = await Quiz.create({
                quizTitle, 
                category, 
                private, 
                tags,
                questions,
                questionsLength,
                time: parsedTime,
                author: userId,
            });
            
            return res.send({ quiz });
        } catch (err) {
            console.log(err);
            
            return res.status(400).send({ error: "Não foi possível cadastrar o Quiz. Tente novamente." });
        }
    },

    async show(req, res) {
        const userId = req.userId;
        const id = req.params.id;

        try {
            let quiz = await Quiz.findById(id).lean().populate({
                path: 'author',
                model: 'User',
                select: 'userName'
            });
            
            if (!quiz)
                return res.status(404).send({ error: "Nenhum quiz cadastrado com esse id." });
            
            parseQuiz(userId, quiz);

            return res.send({ quiz });
        } catch (err) {
            console.log(err);
            
            return res.status(400).send({ error: "Não foi possível buscar as informações do Quiz. Tente novamente." });
        }
    },
}