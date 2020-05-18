const User = require('../models/User');
const ActivitiesNotifications = require('../models/ActivitiesNotifications');

async function deleteOldNotifications() {
    try {
        let date = new Date();
        const olderThan = new Date(date.setDate(date.getDate() - 20))
        
        // Delete each activity that has been seen 20 or more days ago
        await ActivitiesNotifications.deleteMany({ seen: true, updatedAt: { $lte: olderThan } });
        
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    async index(req, res) {
        try {
            const userId = req.userId;
            const { page=1 } = req.query;

            await deleteOldNotifications();

            const notifications = await ActivitiesNotifications.paginate(
                { recipientUser: userId, },
                {
                    page,
                    limit: 10,
                    sort: { seen: 1, createdAt: -1 }
                }
            );
            
            // const notifications = user.notifications.reverse().slice(0, 13);  //Last added notifications are the first now

            return res.json({ notifications, });
        } catch (err) {
            console.log(err);
            
            return res.status(400).json({ error: "Não foi possível buscar atividades." });
        }
    },
    async show(req, res) {
        try {
            const userId = req.userId;
            
            const newActivities = await ActivitiesNotifications.find({ recipientUser: userId, seen: false });
            
            if (newActivities.length>0) 
                return res.json({ newActivities: true });
            return res.json({ newActivities: false });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: 'Erro' });
        }
    },
    async update(req, res) {
        try{
            const activitiesIdsToUpdate = req.body;
            
            await ActivitiesNotifications.updateMany(
                { _id: { $in: activitiesIdsToUpdate } },
                { $set: { seen: true } },
            );
            // console.log(a);
            return res.json({ message: "Activities updated" });

        } catch(err) {
            console.log('err', err);
            return res.status(400).json({ error: "Not possible to update acitivies" });
        }
    }

}