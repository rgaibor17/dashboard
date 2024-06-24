// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';

function App() {
  // const [count, setCount] = useState(0)

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
        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
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
