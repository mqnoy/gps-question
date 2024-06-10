import express from 'express'
import { HttpException } from '../exceptions'
import { HttpStatus } from '../enums'
import LoginTokenRequest from '../pkg/express/request'
import { userUseCase } from '../user/usecase'
import { HeaderKeys } from '../constant'

export const LoginTokenMiddleware = async (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
) => {
    try {
        const apiKeyHeader = req.headers[HeaderKeys.X_LOGIN_TOKEN]
        if (!apiKeyHeader) {
            throw new HttpException(`API Key is required`, HttpStatus.UNAUTHORIZED)
        }

        const token = req.headers[HeaderKeys.X_LOGIN_TOKEN] as string
        const decoded = Buffer.from(token, 'base64').toString('ascii').trim()

        // Determine user by login_token
        const userValid = await userUseCase.getUserByLoginToken(decoded)

        if (decoded !== userValid.login_token) {
            throw new HttpException(`Wrong key`, HttpStatus.UNAUTHORIZED)
        }

        const newReq = req as LoginTokenRequest
        newReq.__subject = userValid

        req = newReq
        next()
    } catch (error) {
        next(error)
    }
}
