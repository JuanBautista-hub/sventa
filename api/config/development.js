require('dotenv').config(),
    module.exports = {

            database: process.env.DB_DATABASE || 'cocacola',
            host: process.env.DB_HOST || 'localhost',
            username: process.env.DB_USERNAME || "root",
            password: process.env.DB_PASSWORD || "juan",
            dialect: process.env.DB_DIALECT || 'mysql',
            define: {
                timestamps: false,
            
                // Genera claves foraneas de este tipo user_id en vez de userId
                undescored: true
              },
            DOMAIN: 'localhost',
            PORT: '4000',

        }
