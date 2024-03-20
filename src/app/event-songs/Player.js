

import Box from '@mui/material/Box';
import Plyr from 'plyr-react';

const style = {
    outline: "none",
    backgroundColor: "#f2f2f2",
    borderRadius: "15px",
    border: "none",
    // margin: "5px",
};


export default function Player(props) {
    // const player = new Plyr('#player', { controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'] });

    return (
        <Box>
            <audio src={props.src} controls style={style}/>           
        </Box>
    )
}