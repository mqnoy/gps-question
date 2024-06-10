
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useGetGPSDevicesQuery } from "../api/gpsApi";
import { GpsDevice } from "../types";

export const DeviceList: FC = () => {
    const navigate = useNavigate()

    // Use the generated hook to fetch data
    const { data: gpsDevices, error, isLoading } = useGetGPSDevicesQuery();

    // Handle loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <div>Error while get device</div>;
    }

    const handleClickDetail = (data: GpsDevice) => {
        navigate(`/device/${data.device_id}`, { state: { data: data } });
    }

    return (
        <>
            <h5 className="title">Devices</h5>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>DeviceID</th>
                        <th>Device Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {gpsDevices?.data.rows.map((gpsDevice: GpsDevice) => (
                        <tr key={gpsDevice.device_id}>
                            <td>{gpsDevice.device_id}</td>
                            <td>{gpsDevice.device_type}</td>
                            <td>
                                <button
                                    className="button is-primary is-outlined"
                                    onClick={() => {
                                        handleClickDetail(gpsDevice)
                                    }} >view</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    )
}
