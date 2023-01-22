const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')

  });
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 8000,
    MAIL_USER: process.env.MAIL_USER,
}