"use client";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';

const music = require('./music.json');

import WorldMusic from './SongTypes/WorldMusic';
import EventMusic from './SongTypes/EventMusic';
import BossList from './SongTypes/BossList';
import StoryList from './SongTypes/StoryList';
import Player from './Player';

const WorldIcons = music.world.map(world => world.icon);

function SongTypeToggle({ musicType, setMusicType, closeWorld }) {
    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setMusicType(newAlignment);
            closeWorld(null);
        }
    };

    return (
        <div style={{ marginBottom: '5px' }}>
            <ToggleButtonGroup
                value={musicType}
                exclusive
                onChange={handleChange}
                size="large"
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    margin: 'auto'
                }}
            >
                <ToggleButton value="Story" aria-label="left aligned">Story</ToggleButton>
                <ToggleButton value="Event" aria-label="centered">Event</ToggleButton>
                <ToggleButton value="Boss" aria-label="right aligned">Boss</ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}

export default function EventSongs() {
    const [musicType, setMusicType] = React.useState('Story');
    const [world, setWorld] = React.useState(null);
    const [songURL, setSongURL] = React.useState("");
    const [selectedBoss, setSelectedBoss] = React.useState(null);
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <Stack direction="column" sx={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
            <div style={{ margin: '10px' }}>
                {isClient && window.innerWidth > 800 && (
                    <SongTypeToggle musicType={musicType} setMusicType={setMusicType} closeWorld={setWorld} />
                )}
                <Player src={songURL} style={{ justifyContent: 'center', margin: 'auto', width: '100%' }} />
            </div>
            
            {world && musicType === 'Story' && <WorldMusic world={world} close={setWorld} setSongURL={setSongURL} />}
            {!world && musicType === 'Story' && <StoryList setWorld={setWorld} closeWorld={setWorld} setSongURL={setSongURL} />}
            {musicType === 'Event' && <EventMusic setSongURL={setSongURL} />}
            {musicType === 'Boss' && <BossList selectedBoss={selectedBoss} setSelectedBoss={setSelectedBoss} setSongURL={setSongURL} />}

            {isClient && window.innerHeight < 800 && (
                <BottomNavigation
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
                    {["Story", "Event", "Boss"].map(type => (
                        <BottomNavigationAction
                            key={type}
                            label={type}
                            value={type}
                            style={{ height: "100%" }}
                        />
                    ))}
                </BottomNavigation>
            )}
        </Stack>
    );
}
