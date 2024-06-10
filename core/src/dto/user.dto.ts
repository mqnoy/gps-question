import { Subject } from './common.dto'

export interface UserAttributes {
    user_id: number
    name: string
    email: string
    password: string
    login_token: string
}

export interface UserDetailResult {
    name: string
    email: string
}
export interface UserLoginPayload {
    email: string
    password: string
}

export interface UserLoginResult {
    user: UserDetailResult
    login_token: string
}

export interface UserDetailPayload {
    subject: Subject
}
