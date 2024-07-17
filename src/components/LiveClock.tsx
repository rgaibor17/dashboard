import Clock from 'react-live-clock';

export default function LiveClock() {
    return(
        <Clock format={'HH:mm:ss'} ticking={true} timezone={'America/Guayaquil'} />
    )
}