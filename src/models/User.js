const mongoose = require('mongoose');
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
    }

}, { timestamps: true });

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 8);

    this.password = hash;

    next();
});

module.exports = mongoose.model('User', UserSchema);