import { createApi } from '@reduxjs/toolkit/query/react'
import { GpsDeviceListResponse } from '../types'
import { baseQuery } from '.'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getUserInfo: builder.query<GpsDeviceListResponse, void>({
            query: () => 'gps/devices',
        }),
    }),
})

export const { useGetUserInfoQuery } = userApi
