import express from 'express'
import { userController } from './user/controller'
import { EnvConfig, sequelizeConnection } from './config'
import { gpsController } from './gps/controller'
import initModels from './model'
import * as middleware from './middleware'
import { HttpException } from './exceptions'
import { HttpStatus } from './enums'
import cors from 'cors'

const App = (): express.Application => {
    const app: express.Application = express()

    const corsOptions = {
        origin: '*',
    }
    app.use(cors(corsOptions))
    app.use(express.json())

    // Initialize routes
    app.use(userController.route)
    app.use(gpsController.route)

    app.get('/', (_req, res, _next) => {
        res.status(HttpStatus.OK).send('ok')
    })

    //fallback url
    app.all('*', (req, _res, _next) => {
        throw new HttpException(`can't find ${req.originalUrl}`, HttpStatus.NOT_FOUND)
    })

    app.use(middleware.ErrorHandler)

    return app
}

async function main(): Promise<void> {
    initModels(sequelizeConnection)

    const app = App()

    // Start server
    const PORT = EnvConfig.appPort
    const server = app.listen(PORT, () => {
        console.log(`Server running in port: ${PORT}`)
    })

    process.on('unhandledRejection', (reason, promise) => {
        console.log('Unhandled Rejection at:', promise, 'reason:', reason)
        server.close(() => {
            console.log('Closed out remaining connections')
        })
    })

    process.on('SIGTERM', () => {
        console.log('SIGTERM signal received.')
        server.close(() => {
            console.log('Closed out remaining connections')
        })
    })

    process.on('SIGINT', () => {
        console.log('SIGINT signal received.')
        server.close(() => {
            console.log('Closed out remaining connections')
        })
    })
}

void main()
