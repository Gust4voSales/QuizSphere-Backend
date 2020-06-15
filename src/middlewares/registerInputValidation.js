const Joi = require('@hapi/joi');

module.exports = (req, res, next) => {
    const schema = Joi.object({
        userName: Joi.string().token().min(3).max(16).required()
            .messages({
                'string.empty': `Usuário não pode ser vazio.`,
                'string.token': `Usuário deve conter apenas caracteres alfa-númericos e _.`,
                'string.min': `Usuário precisa ter {#limit} caracteres no mínimo.`,
                'string.max': `Usuário não pode ter mais de {#limit} caracteres.`,
                'any.required': `Usuário não pode ser vazio.`,
            }),
        
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).max(30).required()
            .messages({
                'string.empty': `Senha não pode ser vazia.`,
                'string.pattern.base': `Senha deve conter apenas caracteres alfa-númericos incluindo letras maíusculas.`,
                'string.min': `Senha precisa ter {#limit} caracteres no mínimo.`,
                'string.max': `Senha não pode ter mais de {#limit} caracteres.`,
                'any.required': `Senha não pode ser vazio.`,
            }),
    }).with('username', 'password');

    const { error, value } = schema.validate(req.body);
    
    if (error) 
        return res.status(400).json({ error: error.message });
        
    return next();
}