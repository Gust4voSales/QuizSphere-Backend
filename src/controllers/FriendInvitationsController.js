const FriendRelation = require('../models/FriendRelation');

module.exports = {
    async index(req, res) {
        try {
            const userId = req.userId;
            
            const invitations = await FriendRelation.find({ requester: userId, status: 1 });

            return res.json({ invitations });

        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: "Nça" });
        }
    },
    
}