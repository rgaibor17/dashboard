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

  let [indicators, setIndicators] = useState([])

  {/* Hook: useEffect */}

  {/* Función para el efecto secundario a ejecutar y Arreglo de dependencias */} 


  useEffect( ()=>{
    (async ()=>{
      {/* 1. Comente el código anterior con el Request */}

      // {/* Request */ }

      //let API_KEY = "cd62221f8e7d8fd76c7cc5cb5d7878e5"
      // let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
      // let savedTextXML = await response.text();


      {/* 2. Del LocalStorage, obtiene el valor de las claves openWeatherMap y expiringTime */}

      let savedTextXML = localStorage.getItem("openWeatherMap")
      let expiringTime = localStorage.getItem("expiringTime")

      {/* 3. Obtenga la estampa de tiempo actual */}

      let nowTime = (new Date()).getTime();

      {/* 4. Realiza la petición asicrónica cuando: 
          (1) La estampa de tiempo de expiración (expiringTime) es nula, o  
          (2) La estampa de tiempo actual es mayor al tiempo de expiración */}

      if(expiringTime === null || nowTime > parseInt(expiringTime)) {

          {/* 5. Request */}

          let API_KEY = "cd62221f8e7d8fd76c7cc5cb5d7878e5"
          let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
          savedTextXML = await response.text();


          {/* 6. Diferencia de tiempo */}

          let hours = 1
          let delay = hours * 3600000


          {/* 7. En el LocalStorage, almacena texto en la clave openWeatherMap y la estampa de tiempo de expiración */}

          localStorage.setItem("openWeatherMap", savedTextXML)
          localStorage.setItem("expiringTime", (nowTime + delay ).toString() )
      }

      {/* XML Parser */}

       const parser = new DOMParser();
       const xml = parser.parseFromString(savedTextXML, "application/xml");
      

      {/* Arreglo para agregar los resultados */}

      let dataToIndicators = new Array()

      {/* 
          Análisis, extracción y almacenamiento del contenido del XML 
          en el arreglo de resultados
      */}

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
    })()
  }, [] )

  return (
    /*<Grid container spacing={5}>
      <Grid xs={12} sm={4} md={3} lg={2}>1</Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>2</Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>3</Grid>
      <Grid xs={12} sm={4} md={3} lg={2}>4</Grid>
      <Grid xs={6} sm={4} md={6} lg={2}>5</Grid>
      <Grid xs={6} sm={4} md={6} lg={2}>6</Grid>
    </Grid>*/

    <Grid container spacing={5}>
      <Grid xs={12} sm={2} md={2} lg={2}>
        {indicators[0]}
        {/*<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />*/}
      </Grid>
      <Grid xs={12} sm={2} md={2} lg={2}>
        {indicators[1]}
        {/*<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />*/}
      </Grid>
      <Grid xs={12} sm={2} md={2} lg={2}>
        {indicators[2]}
        {/*<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />*/}
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
	       <BasicTable />
      </Grid>

      <Grid xs={12} lg={2}>
             <ControlPanel />
      </Grid>
      <Grid xs={12} lg={10}>
             <WeatherChart></WeatherChart>
      </Grid>
    </Grid>
  )
}

export default App
