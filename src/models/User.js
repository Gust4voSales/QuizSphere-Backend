const mongoose = require('mongoose');
const Paginate = require('mongoose-paginate-v2');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    savedQuizzes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Quiz',
    },
    friendRelations: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'FriendRelation',
    },

}, { timestamps: true });

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 8);

    this.password = hash;

    next();
});

mongoose.plugin(Paginate);

module.exports = mongoose.model('User', UserSchema);