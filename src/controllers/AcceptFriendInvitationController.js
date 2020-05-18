const User = require('../models/User');
const ActivitiesNotifications = require('../models/ActivitiesNotifications');
const FriendRelation = require('../models/FriendRelation');

async function createNotification(userId, newFriendUserName) {
    try {
        const newActivity = await ActivitiesNotifications.create({
            recipientUser: userId,
            newFriend: newFriendUserName,
            activityType: 'newFriend',
        });

        return newActivity;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    async store(req, res) {
        try {
            const requesterId = req.userId;
            const recipientId = req.params.recipientId;

            await FriendRelation.findOneAndUpdate(
                { requester: requesterId, recipient: recipientId }, // add status later?
                { $set: { status: 2 } },
                { new: true, runValidators: true },
            );
            await FriendRelation.findOneAndUpdate(
                { recipient: requesterId, requester: recipientId },
                { $set: { status: 2 } },
                { new: true, runValidators: true },
            );
            
            // Socket
            const userWhoAccepted = await User.findById(requesterId, 'userName');  
            const ownerSocketRecipient = req.connectedUsers[recipientId];
            
            // Add notification 
            const activityNotification = await createNotification(recipientId, userWhoAccepted.userName);
            
            // If the user is connected send the new friend via socket
            if (ownerSocketRecipient) {
                req.io.to(ownerSocketRecipient).emit('new_activity', activityNotification);
                console.log(activityNotification);
                
            } 

            return res.json({ message: "Usuário adicionado." });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: "Não foi possível aceitar o pedido de amizade. Tente novamente." });
        }
    }
}