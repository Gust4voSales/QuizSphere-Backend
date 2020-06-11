const mongoose = require('mongoose');
const Paginate = require('mongoose-paginate-v2');

// Created when a user accepts an invitation or when someone share a quiz with you
const ActivitiesSchema = new mongoose.Schema({
    recipientUser: { // User that will be notified
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }, 
    friendName: String, 
    quizId: mongoose.Schema.Types.ObjectId, // Used in the "sharedQuiz" activity type
    activityType: { // newFriend, sharedQuiz
        type: String,
        required: true,
    },
    seen: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

mongoose.plugin(Paginate);

module.exports = mongoose.model('ActivitiesNotifications', ActivitiesSchema);