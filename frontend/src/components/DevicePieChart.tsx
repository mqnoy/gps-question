
import { ApexOptions } from "apexcharts";
import { FC } from "react";
import ReactApexChart from "react-apexcharts";
import { GpsChart } from "../types";

type DevicePieChartProps = {
    data?: GpsChart
}

export const DevicePieChart: FC<DevicePieChartProps> = (props) => {
    if (!props.data) {
        return <></>
    }

    const chartData = props.data
    const options: ApexOptions = {
        series: chartData.series,
        chart: {
            type: 'pie',
        },
        legend: {
            show: true
        },
        labels: chartData.labels,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {

                },
                legend: {
                    position: 'top',
                },
            },
        }],
    }

    return (
        <>
            <div id="chart">
                <ReactApexChart options={options} series={chartData.series} type="pie" />
            </div>
            <div id="html-dist"></div>
        </>
    )
}
