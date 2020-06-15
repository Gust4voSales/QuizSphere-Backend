const mongoose = require('mongoose');
const Paginate = require('mongoose-paginate-v2');
const bcrypt = require('bcrypt');
const SharedQuizSchema = require('./utils/SharedQuiz');


const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    savedQuizzes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Quiz',
    },
    sharedQuizzes: {
        type: [SharedQuizSchema],
    },

}, { timestamps: true });

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 8);

    this.password = hash;

    next();
});

mongoose.plugin(Paginate);

module.exports = mongoose.model('User', UserSchema);