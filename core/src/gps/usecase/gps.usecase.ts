import {
    GpsChartResult,
    GpsDetailPayload,
    GpsDetailResult,
    GpsDeviceDetailResult,
    ListResponse,
} from '../../dto'
import { dateUtil } from '../../utils'
import { gpsRepository } from '../repository'
import { DateTime } from 'luxon'

export const listDevices = async (): Promise<ListResponse<GpsDeviceDetailResult>> => {
    const devices = await gpsRepository.selectDevices()

    const rows: GpsDeviceDetailResult[] = []
    for (const device of devices) {
        rows.push({
            device_id: device.device_id,
            device_type: device.device_type,
        })
    }
    return {
        metadata: null,
        rows,
    }
}

export const listDeviceGps = async (
    payload: GpsDetailPayload
): Promise<ListResponse<GpsDetailResult>> => {
    const { device_id } = payload

    const deviceGps = await gpsRepository.selectGpsByDeviceId(device_id)

    const rows: GpsDetailResult[] = []
    for (const dg of deviceGps) {
        rows.push({
            id: Number(dg.id),
            timestamp: dateUtil.DateToEpoch(dg.timestamp),
            location: dg.location,
        })
    }

    return {
        metadata: null,
        rows,
    }
}

export const chartDeviceGps = async (payload: GpsDetailPayload): Promise<GpsChartResult> => {
    const { device_id } = payload

    const deviceGps = await gpsRepository.selectGpsByDeviceId(device_id)

    const mappedLocations: Map<string, DateTime[]> = new Map()

    for (let index = 0; index < deviceGps.length; index++) {
        const dg = deviceGps[index]
        const el = mappedLocations.get(dg.location)
        if (el) {
            el.push(DateTime.fromJSDate(dg.timestamp))
            continue
        }

        mappedLocations.set(dg.location, [DateTime.fromJSDate(dg.timestamp)])
    }

    let sumTime = 0
    const locationDurations: Map<string, number> = new Map()
    for (const [location, timestamps] of mappedLocations) {
        let totalDuration = 0
        for (let i = 0; i < timestamps.length - 1; i++) {
            const currTms = timestamps[i]
            const nextTms = timestamps[i + 1]

            totalDuration += nextTms.diff(currTms, 'minutes').minutes
        }

        if (timestamps.length > 0) {
            totalDuration += 5
        }

        locationDurations.set(location, totalDuration)

        sumTime += totalDuration
    }

    const series: number[] = []
    const labels: string[] = []
    for (const [location, duration] of locationDurations) {
        labels.push(location)

        // calculate percentage
        const percent = (duration / sumTime) * 100
        series.push(Number(percent.toFixed(2)))
    }

    console.log(`series: `, series)
    console.log(`labels: `, labels)
    const results: GpsChartResult = {
        labels,
        series,
    }

    return results
}
