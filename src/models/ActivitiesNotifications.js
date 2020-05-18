const mongoose = require('mongoose');
const Paginate = require('mongoose-paginate-v2');


const ActivitiesSchema = new mongoose.Schema({
    recipientUser: mongoose.Schema.Types.ObjectId,
    newFriend: String,
    quizId: mongoose.Schema.Types.ObjectId,
    activityType: String,
    seen: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

mongoose.plugin(Paginate);

module.exports = mongoose.model('ActivitiesNotifications', ActivitiesSchema);