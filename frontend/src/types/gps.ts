import { BaseResponse, ListResponse } from './common'

export interface Gps {
    id: number
    timestamp: number
    location: string
}

export interface GpsDevice {
    device_id: string
    device_type: string
}

export interface GpsChart {
    series: number[]
    labels: string[]
}

export type GpsDeviceListResponse = BaseResponse<ListResponse<GpsDevice>>

export type GpsListResponse = BaseResponse<ListResponse<Gps>>

export type GpsPieChartResponse = BaseResponse<GpsChart>
