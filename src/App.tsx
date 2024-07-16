// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react';
import './App.css'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';

function App() {
  // const [count, setCount] = useState(0)

  {/* Variable de estado y función de actualización */}
  {/*
    Solución para asignación de indicatorsElements a indicators mediante función de actualización
    let array:any[] = [], useState(array) || useState<any[]>([])
    any[] no era asignable a never[], se debe especificar el tipado dentro del Hook
  */}
  
  let [indicators, setIndicators] = useState<any[]>([])
  
  // 2.1 Variables de estado para dataTable (rangeHours, windDirection)

  let [rowsTable, setRowsTable] = useState<any[]>([])

  let[chartData, setChart] = useState<any>([])

  {/* Hook: useEffect */}

  {/* Función para el efecto secundario a ejecutar y Arreglo de dependencias */} 


  useEffect( ()=>{
    (async ()=>{
      {/* 1.1 Código anterior con el Request comentado */}

      // {/* Request */ }
      // let API_KEY = "cd62221f8e7d8fd76c7cc5cb5d7878e5"
      // let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
      // let savedTextXML = await response.text();

      {/* 1.2 Del LocalStorage, se obtiene el valor de las claves openWeatherMap y expiringTime */}

      let savedTextXML = localStorage.getItem("openWeatherMap")!
      let expiringTime = localStorage.getItem("expiringTime")

      {/* 1.3 Estampa de tiempo actual */}

      let nowTime = (new Date()).getTime();

      {/* 1.4 Se realiza la petición asicrónica cuando: 
          (1) La estampa de tiempo de expiración (expiringTime) es nula, o  
          (2) La estampa de tiempo actual es mayor al tiempo de expiración */}

      if(expiringTime === null || nowTime > parseInt(expiringTime)) {

          {/* 1.5 Request */}

          let API_KEY = "cd62221f8e7d8fd76c7cc5cb5d7878e5"
          let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
          savedTextXML = await response.text();


          {/* 1.6 Diferencia de tiempo */}

          let hours = 1
          let delay = hours * 3600000


          {/* 1.7 En el LocalStorage, almacena texto en la clave openWeatherMap y la estampa de tiempo de expiración */}

          localStorage.setItem("openWeatherMap", savedTextXML)
          localStorage.setItem("expiringTime", (nowTime + delay ).toString() )
      }

      {/* XML Parser */}

       const parser = new DOMParser();
       const xml = parser.parseFromString(savedTextXML, "application/xml");
      

      {/* Arreglo para agregar los resultados */}

      let dataToIndicators = new Array()

      {/* Análisis, extracción y almacenamiento del contenido del XML en el arreglo de resultados */}

      let location = xml.getElementsByTagName("location")[1]
      let name = xml.getElementsByTagName("name")[0].innerHTML

      let geobaseid = location.getAttribute("geobaseid")
      dataToIndicators.push([name,"geobaseid", geobaseid])

      let latitude = location.getAttribute("latitude")
      dataToIndicators.push([name,"Latitude", latitude])

      let longitude = location.getAttribute("longitude")
      dataToIndicators.push([name,"Longitude", longitude])

      console.log( dataToIndicators )

      {/* Renderice el arreglo de resultados en un arreglo de elementos Indicator */}

      let indicatorsElements = Array.from(dataToIndicators).map(
        (element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
      )

      {/* Modificación de la variable de estado mediante la función de actualización */}

      setIndicators(indicatorsElements)
      
      let xmlArray = xml.getElementsByTagName("time")

      // 2.2 Procesamiento de resultados según la estructura del documento XML
      
      let tableArray = Array.from( xmlArray ).map( (timeElement) =>  {

        let rangeHours = timeElement.getAttribute("from")!.split("T")[0] + " " + timeElement.getAttribute("from")!.split("T")[1]
        let precipitation = timeElement.getElementsByTagName("precipitation")[0].getAttribute("probability")
        let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " " +  timeElement.getElementsByTagName("windDirection")[0].getAttribute("code")
        let windSpeed = timeElement.getElementsByTagName("windSpeed")[0].getAttribute("mps")
        let temperature = Math.round(Number(timeElement.getElementsByTagName("temperature")[0].getAttribute("value")) - 273.15)
        let humidity = timeElement.getElementsByTagName("humidity")[0].getAttribute("value")

        return { 
          "rangeHours": rangeHours,
          "precipitation": precipitation,
          "windDirection": windDirection,
          "windSpeed": windSpeed,
          "temperature": temperature,
          "humidity": humidity,
        }
      })

      tableArray = tableArray.slice(0,10)
      setRowsTable(tableArray) // 2.3 Actualización de variable de estado rowsTable

      let chartArray = Array. from ( xmlArray ).map((timeElement) => {

        let rangeHours = timeElement.getAttribute("from")!.split("T")[0] + " " + timeElement.getAttribute("from")!.split("T")[1]
        let precipitation = Number(timeElement.getElementsByTagName("precipitation")[0].getAttribute("probability"))*100
        let humidity = Number(timeElement.getElementsByTagName("humidity")[0].getAttribute("value"))
        let clouds = Number(timeElement.getElementsByTagName("clouds")[0].getAttribute("all"))

        return {
          "rangeHours": rangeHours,
          "precipitation": precipitation,
          "humidity": humidity,
          "clouds": clouds,
        }
      })

      chartArray = chartArray.slice(0,8)
      setChart(chartArray) // 2.3 Actualización de variable de estado chartData

    })()
  }, [] )

  return (
    <Grid container spacing={5}>
      <Grid xs={12} sm={2} md={2} lg={2}>
        {indicators[0]}
      </Grid>
      <Grid xs={12} sm={2} md={2} lg={2}>
        {indicators[1]}
      </Grid>
      <Grid xs={12} sm={2} md={2} lg={2}>
        {indicators[2]}
      </Grid>
      <Grid xs={12} sm={2} md={2} lg={2}>
        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
      </Grid>
      <Grid xs={12} sm={2} md={2} lg={2}>
        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
      </Grid>
      <Grid xs={12} sm={2} md={2} lg={2}>
        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
      </Grid>

      <Grid xs={12} sm={2} md={2} lg={2}>
        <Grid xs={12} lg={12} sx={{paddingBottom: "5%"}}>
          <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
        </Grid>
        <Grid lg={12} sx={{paddingBottom: "5%"}}>
          <Summary/>
        </Grid>
      </Grid>

      <Grid xs={12} md={10} lg={10}>
	       <BasicTable rows={rowsTable}></BasicTable> {/* Variable de estado enviada como prop del componente */}
      </Grid>

      <Grid xs={12} lg={2}>
             <ControlPanel />
      </Grid>
      <Grid xs={12} lg={10}>
             <WeatherChart info={chartData}></WeatherChart>
      </Grid>
    </Grid>

    /*
      <Grid container spacing={5}>
        <Grid xs={12} sm={4} md={3} lg={2}>1</Grid>
        <Grid xs={6} sm={4} md={3} lg={2}>2</Grid>
        <Grid xs={6} sm={4} md={3} lg={2}>3</Grid>
        <Grid xs={12} sm={4} md={3} lg={2}>4</Grid>
        <Grid xs={6} sm={4} md={6} lg={2}>5</Grid>
        <Grid xs={6} sm={4} md={6} lg={2}>6</Grid>
      </Grid>
    */
  )
}

export default App
