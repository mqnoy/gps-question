import sequelize from 'sequelize'
import { GpsAttributes } from '../../dto'
import { Gps } from '../../model'

export const selectGpsByDeviceId = async (device_id: string): Promise<GpsAttributes[]> => {
    return await Gps.findAll({
        order: [['timestamp', 'ASC']],
        where: {
            device_id,
        },
    })
}

export const selectDevices = async (): Promise<GpsAttributes[]> => {
    return Gps.findAll({
        attributes: [
            [sequelize.fn('DISTINCT', sequelize.col('device_id')), 'device_id'],
            'device_type',
        ],
        where: {},
    })
}
