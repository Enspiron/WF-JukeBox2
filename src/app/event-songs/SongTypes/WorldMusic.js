import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';

const music = require('../music.json');

const WorldIcons = music.world.map((world) => {
    return world.icon;
})

function buildWorldMusicURL(worldID, songID, type) {
    const source = "https://wfjukebox.b-cdn.net/music/StoryBGM/"
    const worldSong = source + worldID;

    const withType = type === "Story" ? worldSong + "/story/" : worldSong + "/battle/";
    const songURL = withType + songID;

    return songURL;
}

function WorldMusic(props) {
    //Toggle between story and boss music
    const [storyMusic, setStoryMusic] = useState("Story");
    const types = ["Story", "Boss"];
    const songs = music.world[props.world].songs
    const [songURL, setSongURL] = useState("");
    const [selectedSong, setSelectedSong] = useState(1);
    const worldID = music.world[props.world].id;

    const handleListItemClick = (event, index) => {
        setSelectedSong(index);
        const type = storyMusic === "Story" ? "story" : "battle";
        props.setSongURL(buildWorldMusicURL(worldID, songs[type][index], storyMusic));
    };

    const songList = storyMusic === "Story" ? songs.story : songs.battle;

    const Children = songList.map((song, index) => {
        return (
            <ListItemButton
                key={index}
                selected={selectedSong === index}
                onClick={(event) => handleListItemClick(event, index)}
            >
                {song}
            </ListItemButton>
        )
    })

    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setStoryMusic(newAlignment);
        }
    }

    const control = {
        value: storyMusic,
        onChange: handleChange,
        exclusive: true,
    }

    useEffect(() => {
        const handleResize = () => {
            // Update state when window size changes
            setWindowWidth(window.innerWidth);
        };
        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
        // Remove event listener when component unmounts
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    return (
        <div>
            <Button size="small" onClick={() => props.close(null)}>
                <KeyboardArrowLeft /> Back
            </Button>
            <h1 style={{ width: '100%', textAlign: 'center' }}>World Music</h1>
            <Stack
                direction={windowWidth > 600 ? "row" : "column"}
            >
                <Stack margin="15px">
                <img
                    src={WorldIcons[props.world]}
                    style={{
                        width: "100px",
                        height: "auto",
                        margin: "auto",
                        // padding: "10px"
                    }}
                />
                <ToggleButtonGroup {...control} size="large" style={{ justifyContent: "center", alignItems: "center", width: "100%", margin: 'auto' }}>
                    {types.map((type) => (
                        <ToggleButton key={type} value={type} aria-label="left aligned">
                            {type}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
                </Stack>
                <div style={{ width: '100%', height: '100%' }}>
                    <List style={{ height: '200px', overflowY: 'auto', border: '1px solid black', scrollbarWidth: 'thin' }}>
                        {Children}
                    </List>
                </div>
            </Stack>
        </div>
    );
}

export default WorldMusic;
