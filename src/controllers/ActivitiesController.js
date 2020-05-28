const FriendRelation = require('../models/FriendRelation');
const ActivitiesNotifications = require('../models/ActivitiesNotifications');
const deleteOldActivities = require('./utils/deleteOldActivities');

module.exports = {
    async index(req, res) {
        try {
            const userId = req.userId;
            const { page=1 } = req.query;

            await deleteOldActivities();

            const notifications = await ActivitiesNotifications.paginate(
                { recipientUser: userId, },
                {
                    page,
                    limit: 10,
                    sort: { seen: 1, createdAt: -1 }
                }
            );
            
            return res.json({ notifications, });
        } catch (err) {
            console.log(err);
            
            return res.status(400).json({ error: "Não foi possível buscar atividades." });
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
    },


}