const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    questionTitle: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctOptionIndex: {
        type: Number,
        required: true
    },
});

module.exports = QuestionSchema;