import { FC } from "react";
import { Gps, ListResponse } from "../types";

type GpsListProps = {
    data?: ListResponse<Gps>
}

export const GpsList: FC<GpsListProps> = (props) => {
    if (!props.data) {
        return <></>
    }

    const gpsData = props.data
    return (
        <>
            <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {gpsData.rows.map((gps: Gps) => (
                        <tr key={gps.id}>
                            <td>{gps.timestamp}</td>
                            <td>{gps.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
