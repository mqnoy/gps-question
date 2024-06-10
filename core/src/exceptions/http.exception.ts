export class HttpException extends Error {
    declare status: number
    declare message: string

    constructor(message: string, status: number) {
        super(message)

        this.message = message
        this.status = status

        Error.captureStackTrace(this, this.constructor)
    }
}
