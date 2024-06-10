import { HttpStatus } from '../../enums'
import {
    UserAttributes,
    UserDetailPayload,
    UserDetailResult,
    UserLoginPayload,
    UserLoginResult,
} from '../../dto'
import { HttpException } from '../../exceptions'
import { userRepository } from '../repository'
import bcrypt from 'bcrypt'

export const userDetail = async (payload: UserDetailPayload): Promise<UserDetailResult> => {
    const { subject } = payload
    const user = await userRepository.findUserByUserId(subject.subject_id)

    if (!user) {
        throw new HttpException(`user doesn't exist on database`, HttpStatus.NOT_FOUND)
    }

    return composeUserDetail(user)
}

export const login = async (payload: UserLoginPayload): Promise<UserLoginResult> => {
    const { email, password } = payload

    const userValid = await validateUser(email, password)

    const result: UserLoginResult = {
        user: composeUserDetail(userValid),
        login_token: Buffer.from(userValid.login_token).toString('base64'),
    }

    return result
}

const validateUser = async (email: string, pass: string) => {
    const user = await userRepository.findUserByEmail(email)

    if (!user) {
        throw new HttpException(`user doesn't exist on database`, HttpStatus.NOT_FOUND)
    }

    const isPasswordMatch = await bcrypt.compare(pass, user.password)
    if (!isPasswordMatch) {
        throw new HttpException(`password doesn't match`, HttpStatus.UNAUTHORIZED)
    }

    return user
}

export const getUserByLoginToken = async (login_token: string) => {
    const user = await userRepository.findUserByLoginToken(login_token)

    if (!user) {
        throw new HttpException(`user doesn't exist on database`, HttpStatus.NOT_FOUND)
    }

    return user
}

const composeUserDetail = (row: UserAttributes): UserDetailResult => {
    return {
        name: row.name,
        email: row.email,
    }
}
