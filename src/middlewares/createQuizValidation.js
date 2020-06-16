const Joi = require('@hapi/joi');

// This list of categories should be the same list as the one in FeedTrending and CreateQuiz from the app
const categories = ['entretenimento', 'educacionais', 'outros'];

// This list of timers should be the same list as the one in CreateQuiz from the app
const timers = ['1 min', '1:30 min', '2 min', '2:30 min', '5 min', '10 min', '15 min', '30 min'];

module.exports = (req, res, next) => {
    const { quizTitle, category, private, questions, time } = req.body;  
    
    const schema = Joi.object({
        quizTitle: Joi.string().min(4).max(40).required(),
        private: Joi.boolean().strict().required(),
        questions: Joi.array().min(3).max(24).required()
            .items(
                Joi.object({
                    questionTitle: Joi.string().max(160).required(),
                    correctOptionIndex: Joi.number().greater(-1).less(4).required(),
                    options: Joi.array().length(4).required().
                        items(
                            Joi.string().max(52).required()
                    ),
                    key: Joi.string(),
                })
            )
    });

    const { error, value } = schema.validate({
        quizTitle,
        private,
        questions,
    });
    
    let incompatibilityBetweenQuestionsLengthAndTime = false;

    if (error) {
        return res.status(400).json({ error: error.message });
    } else if (!categories.includes(category)) {
        return res.status(400).json({ error: 'Category selected not allowed.' });
    } else if (!timers.includes(time)){
        return res.status(400).json({ error: 'Time selected not allowed.' });
    }
    
    else if (questions.length>10 && time===timers[0]) {
        incompatibilityBetweenQuestionsLengthAndTime = true;
    } else if (questions.length>15 && (time===timers[0] || time===timers[1])) {
        incompatibilityBetweenQuestionsLengthAndTime = true;
    } else if (questions.length>20 && (time===timers[0] || time===timers[1] || time===timers[2])) {
        incompatibilityBetweenQuestionsLengthAndTime = true;
    }

    if (incompatibilityBetweenQuestionsLengthAndTime)
        return res.status(400).json({ error: `Tempo de ${time} é muito curto para um quiz de ${questions.length} questões` });

    return next();
}