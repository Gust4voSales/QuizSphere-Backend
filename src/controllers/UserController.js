const User = require('../models/User');

module.exports = {
    async index(req, res) { // Delete?
        try {
            const { page=1, userName } = req.query;
            const regexExpression = new RegExp(userName, "i"); //Find similar users
            
            const users = await User.paginate({ userName: regexExpression }, {
                page,
                limit: 10,
            });

            return res.json({ users });
        } catch(err) {
            return res.status(400).json({ error: "Não foi possível buscar por usuário. Tente novamente." });
        }
    },

    async show(req, res) {
        try {
            const id = req.params.id;

            const user = await User.findById(id).select('-__v -createdAt -updatedAt -friendRelations');

            if (user===null) {
                return res.status(404).json({ error: "Usuário não existe." });
            }

            return res.json({ user });
        } catch(err) {
            console.log(err);
            
            return res.status(400).json({ error: "Não foi possível buscar por usuário. Tente novamente." });
        }
    }

}