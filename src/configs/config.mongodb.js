'use strict'

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 8080
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || 'express-mongo'
    }
}

const config = { dev }
const env = process.env.NODE_ENV || 'dev'

module.exports = config[env];