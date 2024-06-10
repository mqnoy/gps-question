import { BaseResponse, User } from '.'

export interface UserLoginRequest {
    email: string
    password: string
}
export interface UserLoginToken {
    user: User
    login_token: string
}

export type UserLoginResponse = BaseResponse<UserLoginToken>
