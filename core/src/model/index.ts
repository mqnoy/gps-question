import { Sequelize } from 'sequelize'
import { Users } from './users.model'
import { Gps } from './gps.model'

export * from './users.model'
export * from './gps.model'

export default function initModels(sequelize: Sequelize) {
    Users.initModel(sequelize)
    Gps.initModel(sequelize)

    // Define relationships here
}
