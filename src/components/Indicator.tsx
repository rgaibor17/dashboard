import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { CardActionArea } from '@mui/material';

interface Config {
    title?: String;
    subtitle?: String;
    value: Number;
}

export default function Indicator(config: Config) {
    return (
        <CardActionArea>
            <Paper
                elevation={10}
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'lightsteelblue'
                    }}
            >
                <Typography component="h2" variant="h6" color="blue" gutterBottom>
                    {config.title}
                </Typography>
                    <Typography component="p" variant="h4">
                        {config.value.toString()}
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                        {config.subtitle}
                    </Typography>
            </Paper>
        </CardActionArea>
    )
}
