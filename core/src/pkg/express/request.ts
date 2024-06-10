import express from 'express'

export default interface LoginTokenRequest extends express.Request {
    __subject: unknown
}
