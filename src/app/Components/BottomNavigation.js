import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PaletteIcon from '@mui/icons-material/Palette';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Avatar from '@mui/material/Avatar';
import CampaignIcon from '@mui/icons-material/Campaign';
import HandymanIcon from '@mui/icons-material/Handyman';

export default function SimpleBottomNavigation(props) {
    //props would contain the current page ex. props.page = 'home'
    const [value, setValue] = React.useState(2);
    const ref = React.useRef(null);

    return(
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction style={{width: "fit-content"}} onClick={()=>{props.setpage("Music"); props.goback(null)}} icon={<ArrowBackIosNewIcon/>} />
          <BottomNavigationAction label="Soundboard" onClick={()=>{props.setpage("Soundboard")}} icon={<CampaignIcon />} />
          <BottomNavigationAction label="Music" onClick={()=>{props.setpage("Music")}} icon={<MusicNoteIcon />} />
          <BottomNavigationAction label="Art" onClick={()=>{props.setpage("Art")}} icon={<PaletteIcon />} />
          <BottomNavigationAction label="Kit" onClick={()=>{props.setpage("Kit")}} icon={<HandymanIcon />} />

        </BottomNavigation>
      </Paper>
        </Box>
    )

}
