import { Chart } from "react-google-charts";
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

interface Config {
    info: Array<object>;
}

export default function WeatherChart(chartData:Config) {

    let [info, setInfo] = useState<any[]>([])

    useEffect( () => {
        (()=> {
        setInfo(chartData.info)
        })()

    }, [chartData] )

    {/* Configuración */}

    let options = {
        title: "Reporte de Precipitación, Humedad y Nubosidad vs Hora para Guayaquil en las próximas horas",
        curveType: "function",
        legend: { position: "right" },
    }

    {/* Datos de las variables meteorológicas */}

    let infoPoints = info.map((infoPoint) => (
        [infoPoint.rangeHours, infoPoint.precipitation, infoPoint.humidity, infoPoint.clouds]
    ))

    const data = [
        ["Hora", "Precipitación", "Humedad", "Nubosidad"],
        infoPoints[0],
        infoPoints[1],
        infoPoints[2],
        infoPoints[3],
        infoPoints[4],
        infoPoints[5],
        infoPoints[6],
        infoPoints[7],
    ];

    {/* JSX */}

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor:'lightsteelblue'
            }}
        >
            <Chart
                chartType="LineChart"
                data={data}
                width="100%"
                height="400px"
                options={options}
                legendToggle
        />
        </Paper>
    )
}
