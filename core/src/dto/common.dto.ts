export interface BaseAttributes {
    createdAt: Date
    updatedAt: Date
}

export interface ListResponse<T> {
    rows: T[]
    metadata: unknown
}

export interface Subject {
    subject_id: number
    user: {
        user_id: number
        email: string
        name: string
        login_token: string
    }
}
