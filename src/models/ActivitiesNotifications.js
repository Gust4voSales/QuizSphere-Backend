const mongoose = require('mongoose');
const Paginate = require('mongoose-paginate-v2');

// Created when a user accepts an invitation or when someone share a quiz with you
const ActivitiesSchema = new mongoose.Schema({
    recipientUser: mongoose.Schema.Types.ObjectId, // User that will be notified
    friendName: String, 
    quizId: mongoose.Schema.Types.ObjectId,
    activityType: String,
    seen: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

mongoose.plugin(Paginate);

module.exports = mongoose.model('ActivitiesNotifications', ActivitiesSchema);