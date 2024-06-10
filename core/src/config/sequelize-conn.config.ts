import { Sequelize } from 'sequelize'
import { EnvConfig } from './index'

export const sequelizeConnection = new Sequelize(
    EnvConfig.dbName,
    EnvConfig.dbUser,
    EnvConfig.dbPassword,
    {
        host: EnvConfig.dbHost,
        dialect: 'postgres',
    }
)
