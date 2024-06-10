import { DataTypes, Model, Optional, Sequelize } from 'sequelize'
import { GpsAttributes } from '../dto'

export interface GpsCreationAttributes extends Optional<GpsAttributes, 'id'> {}

export class Gps extends Model<GpsAttributes, GpsCreationAttributes> implements GpsAttributes {
    declare id: number
    declare device_id: string
    declare device_type: string
    declare timestamp: Date
    declare location: string

    static initModel(sequelize: Sequelize) {
        Gps.init(
            {
                id: {
                    type: DataTypes.BIGINT,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                device_id: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                device_type: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    unique: true,
                },
                timestamp: {
                    type: 'TIMESTAMP',
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
                    allowNull: false,
                },
                location: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'gps',
            }
        )
    }
}
