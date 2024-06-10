import { DataTypes, Model, Optional, Sequelize } from 'sequelize'
import { UserAttributes } from '../dto'

export interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'> {}

export class Users extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare user_id: number
    declare name: string
    declare email: string
    declare password: string
    declare login_token: string

    static initModel(sequelize: Sequelize) {
        Users.init(
            {
                user_id: {
                    type: DataTypes.BIGINT,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                name: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                login_token: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'users',
            }
        )
    }
}
