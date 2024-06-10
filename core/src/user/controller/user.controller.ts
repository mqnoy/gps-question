import express from 'express'
import { userUseCase } from '../usecase'
import { UserDetailPayload, UserLoginPayload } from '../../dto'
import { HttpStatus } from '../../enums'
import * as middleware from '../../middleware'
import LoginTokenRequest from '../../pkg/express/request'
import { getSubject } from '../../utils/subject'

export const route = express.Router()

route.get(
    '/users/me',
    middleware.LoginTokenMiddleware,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            // Determine user from token
            const reqWithSubject = req as LoginTokenRequest
            const payload: UserDetailPayload = {
                subject: getSubject(reqWithSubject.__subject),
            }
            const result = await userUseCase.userDetail(payload)

            return res.status(HttpStatus.OK).json({
                success: true,
                message: 'me',
                data: result,
            })
        } catch (error) {
            next(error)
        }
    }
)

route.post(
    '/users/login',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const body = req.body as UserLoginPayload
            const payload: UserLoginPayload = {
                ...body,
            }

            const result = await userUseCase.login(payload)

            return res.status(HttpStatus.OK).json({
                success: true,
                message: 'login success',
                data: result,
            })
        } catch (error) {
            next(error)
        }
    }
)
