const User = require('../../models/User');
const ActivitiesNotifications = require('../../models/ActivitiesNotifications');
const FriendRelation = require('../../models/FriendRelation');

async function createNotification(userId, newFriendUserName) {
    try {
        await ActivitiesNotifications.create({
            recipientUser: userId,
            friendName: newFriendUserName,
            activityType: 'newFriend',
        });

        return true;
    } catch (err) {
        return false;
    }
}

module.exports = {
    async store(req, res) {
        try {
            const requesterId = req.userId;
            const recipientId = req.params.recipientId;

            const relation = await FriendRelation.findOneAndUpdate(
                { requester: requesterId, recipient: recipientId, status: 1 }, // add status later?
                { $set: { status: 2 } },
                { new: true, runValidators: true },
            );
            
            if (!relation) throw new Error('There is no friend request to accept');

            await FriendRelation.findOneAndUpdate(
                { recipient: requesterId, requester: recipientId },
                { $set: { status: 2 } },
                { new: true, runValidators: true },
            );
            
            const userWhoAccepted = await User.findById(requesterId, 'userName');  
            
            // Add notification 
            const success = await createNotification(recipientId, userWhoAccepted.userName);
            if (!success) return res.status(500).json({ error: "Erro ao criar notificação" }) // User won't be notified

            // Socket
            const ownerSocketRecipient = req.connectedUsers[recipientId];        
            
            // If the user is connected send the new friend event via socket
            if (ownerSocketRecipient) {
                req.io.to(ownerSocketRecipient).emit('new_activity', {});
            } 

            return res.json({ message: "Usuário adicionado." });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: "Não foi possível aceitar o pedido de amizade. Tente novamente." });
        }
    }
}