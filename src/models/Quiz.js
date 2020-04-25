const mongoose = require('mongoose');
const QuestionSchema = require('./utils/Question');

const QuizSchema = new mongoose.Schema({
    quizTitle: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: [String],
    private: {
        type: Boolean,
        required: true,
    },
    questions: {
        type: [QuestionSchema],
        required: true
    },
});

module.exports = mongoose.model('Quiz', QuizSchema);