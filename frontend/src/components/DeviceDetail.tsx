import { FC, useEffect } from "react";
import { GpsList } from "./index";
import { GpsDevice } from "../types";
import { DevicePieChart } from "./DevicePieChart";
import { useGetGPSByDeviceIdQuery, useGetGPSChartByDeviceIdQuery } from "../api";
import { DateTime } from "luxon";
type DeviceDetailProps = {
    data?: GpsDevice
}


export const epochToDateTime = (e: number): DateTime => {
    return DateTime.fromSeconds(e)
}
export const DeviceDetail: FC<DeviceDetailProps> = (props) => {
    if (!props.data) {
        return <div>Error: determine device</div>;
    }

    const deviceId = props.data.device_id
    const deviceType = props.data.device_type

    // fetch related data
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: gpsChartData, error: gpsChartError, isLoading: gpsChartIsLoading, refetch: refetchGpsChart } = useGetGPSChartByDeviceIdQuery(deviceId);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: gpsData, error: gpsError, isLoading: gpsIsLoading, refetch: gpsRefetch } = useGetGPSByDeviceIdQuery(deviceId);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        // Automatically refetch data when the component mounts
        gpsRefetch();
        refetchGpsChart();
    }, [gpsRefetch, refetchGpsChart]);

    if (gpsChartError || gpsError) {
        console.error(gpsChartError)
        console.error(gpsError)
    }

    return (
        <>
            <section className="hero is-fullheight is-full-width">
                <div className="hero-body">
                    <div className="container ">
                        <div className="is-centered box" style={{ minHeight: "75vh" }}>
                            <div className="p-6">
                                <h5 className="title">{deviceId}</h5>
                                <h5 className="subtitle">{deviceType}</h5>
                                <div className="columns">
                                    <div className="column">
                                        {gpsIsLoading ?
                                            <div>Loading...</div>
                                            :
                                            <GpsList
                                                data={gpsData?.data}
                                            />
                                        }
                                    </div>
                                    <div className="column">
                                        {gpsChartIsLoading ?
                                            <div>Loading...</div>
                                            :
                                            <DevicePieChart
                                                data={gpsChartData?.data}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}
