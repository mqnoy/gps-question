import { FC } from "react"
import Layout from "../Layout"
import { DeviceDetail } from "../../components"
import { useLocation } from "react-router-dom"
import { GpsDevice } from "../../types"

export const DevicePage: FC = () => {
    const { state } = useLocation();
    const data = state.data as GpsDevice

    return (
        <>
            <Layout>
                <DeviceDetail data={data} />
            </Layout>
        </>

    )
}

export default DevicePage