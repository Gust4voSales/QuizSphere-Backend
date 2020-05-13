const User = require('../models/User');
const FriendRelation = require('../models/FriendRelation');

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

            const user = await User.findById(requesterId);  // Do I need to return the user?

            return res.json({ user, message: "Usuário adicionado." });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: "Não foi possível aceitar o pedido de amizade. Tente novamente." });
        }
    }
}