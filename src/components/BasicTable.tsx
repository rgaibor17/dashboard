// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';

interface Config {
  rows: Array<object>;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'lightgray',
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function BasicTable(data:Config) {

  let [rows, setRows] = useState<any[]>([])

  useEffect( () => {
    (()=> {
      setRows(data.rows)
    })()

  }, [data] )

  return (
    <Paper elevation={3} sx={{p: 2, backgroundColor:'lightsteelblue'}}>
      <Typography component="h2" variant="h6" color="black">
        {"Reporte del clima para Guayaquil en las próximas horas"}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"><h4>Rango de horas</h4></StyledTableCell>
              <StyledTableCell align="center"><h4>Precipitación[--]</h4></StyledTableCell>
              <StyledTableCell align="center"><h4>Dirección del viento</h4></StyledTableCell>
              <StyledTableCell align="center"><h4>Velocidad del viento[m/s]</h4></StyledTableCell>
              <StyledTableCell align="center"><h4>Temperatura[°C]</h4></StyledTableCell>
              <StyledTableCell align="center"><h4>Humedad[%]</h4></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.rangeHours}>
                <StyledTableCell align="center" component="th" scope="row"> {row.rangeHours} </StyledTableCell>
                <StyledTableCell align="center"> {row.precipitation} </StyledTableCell>
                <StyledTableCell align="center"> {row.windDirection} </StyledTableCell>
                <StyledTableCell align="center"> {row.windSpeed} </StyledTableCell>
                <StyledTableCell align="center"> {row.temperature} </StyledTableCell>
                <StyledTableCell align="center"> {row.humidity} </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

/*
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
*/
