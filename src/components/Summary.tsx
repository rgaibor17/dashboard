import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import LiveClock from './LiveClock';
import sunrise from '../assets/sunrise.jpeg';
import morning from '../assets/morning.jpg';
import afternoon from '../assets/afternoon.jpg';
import dusk from '../assets/dusk.jpg';
import night from '../assets/night.jpg';

interface Config {
    date:Date,
}

export default function Summary(data:Config) {
    const [dateData, setDateData] =useState<any>([]);

      useEffect( () => {
        (()=> {
        
        let hours = data.date.getHours();
        let time = data.date.toDateString();
        let dateArray = [night, 'Noche', time];

        if (hours >= 5 && hours < 6) {
            dateArray[0] = sunrise
            dateArray[1] = 'Amanecer'
        }
        if (hours >= 6 && hours < 12) {
            dateArray[0] = morning
            dateArray[1] = 'Mañana'
        }
        if (hours >= 12 && hours < 18) {
            dateArray[0] = afternoon
            dateArray[1] = 'Tarde'
        }
        if (hours >= 18 && hours < 19) {
            dateArray[0] = dusk
            dateArray[1] = 'Anochecer'
        }

        setDateData(dateArray);
        })()

    }, [data] )

    return (
        <Card sx={{ maxWidth: 345, backgroundColor:'lightsteelblue'}} elevation={10}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={dateData[0]}
                    alt={dateData[1]}
                />
                <CardContent>
                    <Typography gutterBottom component="h2" variant="h6" color="blue">
                        {dateData[1]}
                    </Typography>
                    <Typography component="p" variant="h4">
                        <LiveClock></LiveClock>
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                    	{dateData[2]}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
