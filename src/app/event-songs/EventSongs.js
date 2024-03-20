"use client"
import * as React from 'react';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';

const music = require('./music.json');

import WorldMusic from './SongTypes/WorldMusic.js'
import EventMusic from './SongTypes/EventMusic.js'
import BossList from './SongTypes/BossList.js'
import StoryList from './SongTypes/StoryList.js'

import Player from './Player.js';

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
          props.closeWorld(null);
        }
      };

    const control = {
        value: props.musicType,
        onChange: handleChange,
        exclusive: true,
    }

    return (
        // <Stack direction="row" spacing={0}>
        <div
        style={{
            marginBottom: '5px'
        }}
        >
            <ToggleButtonGroup {...control}  size="large" style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                margin: 'auto'
            }}
            
            >
                {children}
            </ToggleButtonGroup>
        </div>
    );
    
}


function buildWorldMusicURL(worldID, songID, type) {
    const source = "https://wfjukebox.b-cdn.net/music/StoryBGM/"
    const worldSong = source + worldID;

    const withType = type === "Story" ? worldSong + "/story/" : worldSong + "/battle/";
    const songURL = withType + songID;

    return songURL;
}


export default function EventSongs() {
    const [musicType, setMusicType] = React.useState('Story');
    const [world, setWorld] = React.useState(null);
    const [songURL, setSongURL] = React.useState("");
    const [selectedBoss, setSelectedBoss] = React.useState(null);

    return (
        <Stack direction="column"
            sx={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}
        >

            <div
            style={{
                margin: '10px',
                justifyContent: 'center',
            }}      
            >

         
            {window.innerWidth > 800 ? (<SongTypeToggle 
            musicType={musicType}
            setMusicType={setMusicType}
            closeWorld={setWorld}

            />) : (<div></div>)}
            <Player src={songURL} style={{justifyContent: 'center', margin: 'auto', width: '100%'}}/>
            </div>
            
            {(world != null && musicType === 'Story') && <WorldMusic world={world} close={setWorld} setSongURL={setSongURL}/>}
            {(musicType === 'Story' && world === null) && <StoryList setWorld={setWorld} closeWorld={setWorld} setSongURL={setSongURL}/>}
            {musicType === 'Event' && <EventMusic  setSongURL={setSongURL}/>}
            {musicType === 'Boss' && <BossList setSelectedBoss={setSelectedBoss} selectedBoss={selectedBoss} setSongURL={setSongURL}/>}

            {(window.innerHeight < 800) ? (<BottomNavigation
            showLabels
            value={musicType}
            onChange={(event, newValue) => {
                setMusicType(newValue);
                setWorld(null);
            }}
            style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                bottom: 0,
            
            }}
            >
                {["Story", "Event", "Boss"].map((type) => {
                    return(
                        <BottomNavigationAction
                        style={{
                            height: "100%",
                        }}
                        key={type}
                        label={type}
                        value={type}
                        onClick={()=>{setMusicType(type)}}
                        />
                    )
                })}
            </BottomNavigation>) : (<div></div>)}

        </Stack>
    );


}

