import { DateTime } from 'luxon'

export function DateToEpoch(d: Date): number {
    return DateTime.fromJSDate(d).toSeconds()
}

export function DateToDateTime(d: Date): DateTime {
    return DateTime.fromJSDate(d)
}
