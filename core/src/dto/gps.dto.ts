import { Subject } from './common.dto'

export interface GpsAttributes {
    id: number
    device_id: string
    device_type: string
    timestamp: Date
    location: string
}

export interface GpsDeviceDetailResult {
    device_id: string
    device_type: string
}

export interface GpsDetailPayload {
    device_id: string
    subject: Subject
}

export interface GpsDetailResult {
    id: number
    timestamp: number
    location: string
}

export interface GpsChartResult {
    series: number[]
    labels: string[]
}
