"use client"
import * as React from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const music = require('./music.json');

const WorldIcons = music.world.map((world) =>{
    return world.icon;
})

function SongTypeToggle(props) {
    const children = [
        <ToggleButton value="Story" aria-label="left aligned">
          Story
        </ToggleButton>,
        <ToggleButton value="Event" aria-label="centered">
          Event
        </ToggleButton>,
        <ToggleButton value="Boss" aria-label="right aligned">
          Boss
        </ToggleButton>
      ];

    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
          props.setMusicType(newAlignment);
        }
      };

    const control = {
        value: props.musicType,
        onChange: handleChange,
        exclusive: true,
    }

    return (
        <Stack direction="row" spacing={2}>
            <ToggleButtonGroup {...control}  size="large">
                {children}
            </ToggleButtonGroup>
        </Stack>
    );
    
}

function EventList(props) {
    return (
        <div>
            <h1>Event List</h1>
        </div>
    );

}

function StoryList(props) {
    return (
        <div>
            <h1>Story List</h1>
            {WorldIcons.map((icon) => {
                return(
                    <img src={icon} alt="icon" style={{width: "100px"}} />
                )
            })}
        </div>
    );

}

function BossList(props) {
    return (
        <div>
            <h1>Boss List</h1>
        </div>
    );

}

export default function Home() {
    const [musicType, setMusicType] = React.useState('Story');


    return (
        <Stack direction="column" spacing={2}
        sx={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",

        
        }}
        >
            <div
            style={{
                margin: '20px'
            }}      
            >

         
            <SongTypeToggle 
            musicType={musicType}
            setMusicType={setMusicType}
            sx={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                
                
                
            }}

            />
            </div>

            {musicType === 'Story' && <StoryList />}
            {musicType === 'Event' && <EventList />}
            {musicType === 'Boss' && <BossList />}
        </Stack>
    );


}

