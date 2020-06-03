const mongoose = require('mongoose');
const Paginate = require('mongoose-paginate-v2');


const FriendRelation = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,    
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,    
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

mongoose.plugin(Paginate);

module.exports = mongoose.model('FriendRelation', FriendRelation);