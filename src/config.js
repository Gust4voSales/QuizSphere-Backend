const dotenv = require('dotenv');
dotenv.config();

// EXPORTS THE ENVIROMENT VARIABLES FROM .env FILE TO THE WHOLE APPLICATION
module.exports = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    TOKEN_SECRET: process.env.TOKEN_SECRET, 
}