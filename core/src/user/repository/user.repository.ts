import { UserAttributes } from '../../dto'
import { Users } from '../../model'

export const findUserByUserId = async (user_id: number): Promise<UserAttributes | null> => {
    return await Users.findOne({
        where: {
            user_id,
        },
    })
}

export const findUserByEmail = async (email: string): Promise<UserAttributes | null> => {
    return await Users.findOne({
        where: {
            email,
        },
    })
}

export const findUserByLoginToken = async (login_token: string): Promise<UserAttributes | null> => {
    return await Users.findOne({
        where: {
            login_token,
        },
    })
}
