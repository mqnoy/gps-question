'use strict'

require('dotenv').config()

module.exports = {
    db: {
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || '5432'),
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'gps_question_db',
        dialectOptions: {
            bigNumberStrings: true,
            ssl: {
                ca: process.env.POSTGRES_CA,
            },
        },
    },
}
