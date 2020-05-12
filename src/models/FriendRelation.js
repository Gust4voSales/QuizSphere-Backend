const mongoose = require('mongoose');


const FriendRelation = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: Number,
        enum: [
            0, // Requested
            1, // Pending
            2, // Friends
        ],
    },
}, { timestamps: true });


module.exports = mongoose.model('FriendRelation', FriendRelation);