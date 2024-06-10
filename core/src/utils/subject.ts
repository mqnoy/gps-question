import { Subject, UserAttributes } from '../dto'

export const getSubject = (subject: unknown): Subject => {
    const user = subject as UserAttributes

    return {
        subject_id: user.user_id,
        user: {
            email: user.email,
            user_id: user.user_id,
            name: user.name,
            login_token: user.login_token,
        },
    }
}
