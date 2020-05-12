const User = require('../models/User');

module.exports = {
    async index(req, res) {
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

}