import React, { useState, useRef } from 'react';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import music from '../music.json';
import TextField from '@mui/material/TextField';
const eventTypes = {
    "Anni Events": ["1st Anni", "2nd Anni", "2.5 Anni", "3rd Anni", "3.5 Anni"],
    "Collab Events": ["Kiseki Towa Collab", "Zombie Land Saga Collab", "Re Zero Collab", "GrandBlue Fantasy Collab", "Uma Musame Collab", "Haruhi Collab", "Konosuba Collab", "Black Clover Collab"],
    "Summer Events": ["Summer 2020", "Summer 2021", "Summer 2022"],
    "Valentine Events" : ["Valentine 2020", "Valentine 2022"],
    "Story Events" : ["Neon Skyline", "A Hero's Beginning", "Crown Beasts", "Oath to the Dawn", "The Poppet Princess", "The Yokai Encyclopedia"]
};

const FilterEvents = Object.values(eventTypes).flat();

const FilterableEvents = Object.entries(eventTypes).map(([type, events]) => ({
    type,
    events
}));

function SearchEvent(event) {
    console.log(event)
    //look through the eventTypes and return matching events with the term
    let matchingEvents = [];
    for (const [type, events] of Object.entries(eventTypes)) {
        for (const eventName of events) {
            if (eventName.toLowerCase().includes(event.toLowerCase())) {
                matchingEvents.push(eventName);
            }
        }
    }
    return matchingEvents;
}

console.log(SearchEvent(""));


function MakeCollapsableType({ type, events, handleClick }) {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <div style={{ border: "1px solid black", margin: "5px" }}>
            <ListItemButton onClick={handleToggle}>
                {type}
                <div style={{ marginLeft: "auto" }}>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </div>
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {events.map((event) => (
                        <ListItemButton key={event} onClick={() => handleClick(event)}>
                            {event}
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </div>
    );
}

function EventMusic(props) {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventSongs, setEventSongs] = useState({});
    const [songFormat, setSongFormat] = useState("story");
    const [selectedSong, setSelectedSong] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    
    const [otherOpen, setOtherOpen] = useState(false);
    
    const handleClickOther = () => {
        setOtherOpen(!otherOpen);
    };
    
    const searchResult = searchTerm.trim() ? SearchEvent(searchTerm) : [];


    const handleClick = (eventName) => {
        setSelectedEvent(eventName);
        const event = music.events.find((e) => e.name === eventName);
        if (event) {
            setEventSongs(event.songs);
        }
    };

    const handleType = (type) => {
        setSongFormat(type);
        props.setSongURL(null);
    };

    const NonFilteredEvents = () => {
        return music.events.map(({ name, icon }) => (
            !FilterEvents.includes(name) && (
                <ListItemButton key={name} onClick={() => handleClick(name)}>
                    <img style={{ width: "100%" }} src={icon} alt={name} />
                </ListItemButton>
            )
        ));
    
    }
    

    const buildEventMusicURL = (eventName, songName, type) =>
        `https://wfjukebox.b-cdn.net/music/event/${music.events.find((e) => e.name === eventName).id}/${type}/${songName}`;

    const songType = ["Story", "Battle", "System"];

    const getSongList = () => {
        let songs = eventSongs[songFormat] || ["No songs available"];
        return songs;
    };

    return (
        <Stack direction="column" justifyContent="center" alignItems="center" width="100%">
            <h1>Event List</h1>
            {selectedEvent === null &&(<TextField 
                id="outlined-basic" label="Search" variant="outlined" size="small" 
                value={searchTerm} onChange={handleSearchChange} 
            />)}
            {(selectedEvent === null && searchTerm === "" && searchResult.length === 0) && (
                <List style={{ height: '500px', width: '80%', overflowY: 'auto', scrollbarWidth: 'none' }}>
                    {FilterableEvents.map(({ type, events }) => (
                        <MakeCollapsableType key={type} type={type} events={events} handleClick={handleClick} />
                    ))}
                    <div style={{border: '1px solid black'}}>
                        <ListItemButton onClick={handleClickOther}>
                            Other
                            <div style={{ marginLeft: "auto" }}>
                                {otherOpen ? <ExpandLess /> : <ExpandMore />}
                            </div>
                        </ListItemButton>
                        <Collapse in={otherOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <NonFilteredEvents />
                            </List>
                        </Collapse>
                    </div>

                    {music.events.map(({ name, icon }) => (
                        !FilterEvents.includes(name) && (
                            <ListItemButton key={name} onClick={() => handleClick(name)}>
                                <img style={{ width: "100%" }} src={icon} alt={name} />
                            </ListItemButton>
                        )
                    ))}
                    
                </List>
            )}
            {(selectedEvent === null && searchTerm.value != "") ? (
                <List style={{ height: '500px', width: '80%', overflowY: 'auto', scrollbarWidth: 'none' }}>
                    {searchResult.map((eventName) => (
                        <ListItemButton key={eventName} onClick={() => handleClick(eventName)}>
                            {eventName}
                        </ListItemButton>
                    ))}
                </List>
            ) : null}
            {selectedEvent !== null && (
                <Stack>
                    <Button onClick={() => setSelectedEvent(null)}>Back</Button>
                    {/* <audio src={buildEventMusicURL(selectedEvent, getSongList()[selectedSong], songFormat)} controls /> */}
                    {selectedEvent}
                    <ToggleButtonGroup value={songFormat} exclusive onChange={(event, newAlignment) => newAlignment !== null && handleType(newAlignment)} >
                        {songType.map((type) => (
                            <ToggleButton key={type} value={type.toLowerCase()} aria-label={type}>
                                {type}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Stack>
            )}
            {selectedEvent !== null && (<div >
                <List
                style={{
                    border: '1px solid black',
                    marginTop: '10px',
                    height: '300px',
                    overflowY: 'auto',
                }}
                >
                    {selectedEvent !== null && getSongList().map((song, index) => (
                        <ListItemButton key={index} onClick={() => {setSelectedSong(index); props.setSongURL(buildEventMusicURL(selectedEvent, getSongList()[index], songFormat))}} selected={selectedSong === index}>
                            {song}
                        </ListItemButton>
                    ))}
                </List>
            </div>)}
        </Stack>
    );
}

export default EventMusic;
