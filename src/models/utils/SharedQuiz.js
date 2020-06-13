const mongoose = require('mongoose');

const SharedQuizSchema = mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { _id: false });

module.exports = SharedQuizSchema;