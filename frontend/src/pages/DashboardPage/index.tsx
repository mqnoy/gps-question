import { FC } from "react"
import Layout from "../Layout"
import { DeviceList } from "../../components"

export const DashboardPage: FC = () => {

    return (
        <>
            <Layout>
                <DeviceList />
            </Layout>
        </>

    )
}

export default DashboardPage