const mongoose = require('mongoose');
const Paginate = require('mongoose-paginate-v2');

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
    questionsLength: {
        type: Number,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

mongoose.plugin(Paginate);

module.exports = mongoose.model('Quiz', QuizSchema);