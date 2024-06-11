import { Sequelize } from 'sequelize'
import { EnvConfig } from './index'

export const sequelizeConnection = new Sequelize({
    database: EnvConfig.dbName,
    username: EnvConfig.dbUser,
    password: EnvConfig.dbPassword,
    host: EnvConfig.dbHost,
    port: EnvConfig.dbPort,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
            ca: EnvConfig.postgresCA,
        },
    },
})
