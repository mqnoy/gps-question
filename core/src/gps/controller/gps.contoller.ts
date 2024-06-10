import express from 'express'
import { gpsUseCase } from '../usecase'
import { GpsDetailPayload } from '../../dto'
import * as middleware from '../../middleware'
import LoginTokenRequest from '../../pkg/express/request'
import { getSubject } from '../../utils/subject'

export const route = express.Router()

route.get(
    '/gps/devices',
    middleware.LoginTokenMiddleware,
    async (req: express.Request, res: express.Response) => {
        const result = await gpsUseCase.listDevices()

        console.log(req.query)

        return res.json({
            success: true,
            data: result,
        })
    }
)

route.get(
    '/gps/devices/:deviceId',
    middleware.LoginTokenMiddleware,
    async (req: express.Request, res: express.Response) => {
        const reqWithSubject = req as LoginTokenRequest

        const payload: GpsDetailPayload = {
            device_id: req.params.deviceId,
            subject: getSubject(reqWithSubject.__subject),
        }

        const result = await gpsUseCase.listDeviceGps(payload)

        console.log(req.query)

        return res.json({
            success: true,
            data: result,
        })
    }
)

route.get(
    '/gps/devices/:deviceId/chart',
    middleware.LoginTokenMiddleware,
    async (req: express.Request, res: express.Response) => {
        const reqWithSubject = req as LoginTokenRequest

        const payload: GpsDetailPayload = {
            device_id: req.params.deviceId,
            subject: getSubject(reqWithSubject.__subject),
        }

        const result = await gpsUseCase.chartDeviceGps(payload)

        return res.json({
            success: true,
            data: result,
        })
    }
)
