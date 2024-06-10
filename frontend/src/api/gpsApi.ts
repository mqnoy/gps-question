import { createApi } from '@reduxjs/toolkit/query/react'
import { GpsDeviceListResponse, GpsListResponse, GpsPieChartResponse } from '../types'
import { baseQuery } from '.'

export const gpsApi = createApi({
    reducerPath: 'gpsApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getGPSDevices: builder.query<GpsDeviceListResponse, void>({
            query: () => '/gps/devices',
        }),
        getGPSByDeviceId: builder.query<GpsListResponse, string>({
            query: (device_id) => `/gps/devices/${device_id}`,
        }),
        getGPSChartByDeviceId: builder.query<GpsPieChartResponse, string>({
            query: (device_id) => `/gps/devices/${device_id}/chart`,
        }),
    }),
})

export const { useGetGPSDevicesQuery, useGetGPSByDeviceIdQuery, useGetGPSChartByDeviceIdQuery } =
    gpsApi
