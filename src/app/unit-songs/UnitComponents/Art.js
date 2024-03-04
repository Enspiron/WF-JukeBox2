import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Button from '@mui/material/Button';

import Character from '../../../Character.js'
import Stack from '@mui/material/Stack';

export default function Art(props) {
    const unit = new Character(props.unit)
    const [open, setOpen] = React.useState(false);
    const [secondOpen, setSecondOpen] = React.useState(false);

    const [art, setArt] = React.useState("special")

    const handleClick = () => {
      setOpen(!open);
    };

    const handleSecondClick = () => {
        setSecondOpen(!secondOpen);
      };

    function copyArt() {
        const textArea = unit.animation(art);
        const text = document.createElement('textarea');
        text.value = textArea;
        document.body.appendChild(text);
        text.focus();
        text.select();
        try {
            document.execCommand('copy');
        }
        catch (err) {
            console.error('Unable to copy', err);
        }
        document.body.removeChild(text);
    }

    return(
        <div>
            <Stack direction="column" alignItems="center" >
            <h4 style={{
                justifyContent: "center",
                alignItems: "center",
                
            }}>{unit.enName}</h4>
            <img 
            style={{
                width: "90%",
            }}
            src={unit.animation(art)}  />
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                    Pick the  gif or image
                    </ListSubheader>
                }
                >
                
                <ListItemButton onClick={handleClick}>
                    <ListItemText primary="Art" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {["square_0", "square_1", "full_shot_0", "full_shot_1"].map((art, index) => {
                            return(
                                <ListItemButton sx={{ pl: 4 }}
                                onClick={()=>{setArt(art)}}
                                >
                                    <ListItemText primary={art} />
                                </ListItemButton>
                            )
                            }
                        )}
                    </List>
                </Collapse>
                <ListItemButton onClick={handleSecondClick}>
                    <ListItemText primary="Gifs" />
                    {secondOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={secondOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {["special", "skill_ready", "kachidoki", "walk_front", "walk_back"].map((gif, index) => {
                            return(
                                <ListItemButton sx={{ pl: 4 }}
                                onClick={()=>{setArt(gif)}}
                                >
                                    <ListItemText primary={gif} />
                                </ListItemButton>
                            )
                        }    
                    )}
                    </List>
                </Collapse>
                </List>
                <Button
                onClick={()=>{copyArt()}}
                varient="contained" color="primary"
                >Copy URL for art</Button>
            </Stack>
        </div>
    )
}