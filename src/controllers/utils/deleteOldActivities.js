const ActivitiesNotifications = require('../../models/ActivitiesNotifications');

async function deleteOldActivities() {
        try {
            let date = new Date();
            const olderThan = new Date(date.setDate(date.getDate() - 20))
            
            // Delete each activity that has been seen 20 or more days ago
            await ActivitiesNotifications.deleteMany({ seen: true, updatedAt: { $lte: olderThan } });
            
        } catch (err) {
            console.log(err);
        }
}


module.exports = deleteOldActivities;
    
