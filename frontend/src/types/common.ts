export type BaseResponse<D> = {
    success: boolean
    data: D
}

export type ListResponse<R> = {
    metadata: unknown
    rows: R[]
}
