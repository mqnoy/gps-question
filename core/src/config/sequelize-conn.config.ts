import { Sequelize } from 'sequelize'
import { EnvConfig } from './index'

let options: Sequelize

if (EnvConfig.postgresUrl) {
    options = new Sequelize(EnvConfig.postgresUrl, {
        dialect: 'postgres',
    })
} else {
    options = new Sequelize(EnvConfig.dbName, EnvConfig.dbUser, EnvConfig.dbPassword, {
        host: EnvConfig.dbHost,
        dialect: 'postgres',
    })
}

export const sequelizeConnection = options
