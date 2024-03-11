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
    
    const NavigationItems = [
        {name: "Soundboard", icon: <CampaignIcon />},
        {name: "Music", icon: <MusicNoteIcon />},
        {name: "Art", icon: <PaletteIcon />},
        {name: "Kit", icon: <HandymanIcon />}
    ]

    const buttonStyle = {
        // width: "fit-content",
        //left and right border
        // border: "1px solid",
        // borderRadius: "20px",
        // margin: "2px",


    }

    const backButton = {
      // border: "1px solid",
      // width: "fit-content",
      // borderRadius: "20px",
      // padding: "-50px",
      

    }

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
          style={{marginRight: '20px'}}
        >
          <BottomNavigationAction style={backButton} onClick={()=>{props.setpage("Music"); props.goback(null)}} icon={<ArrowBackIosNewIcon/>} />
          {NavigationItems.map((item, index) => {
              return(
                <BottomNavigationAction style={buttonStyle} label={item.name} onClick={()=>{props.setpage(item.name)}} icon={item.icon} />
              )
          
          })}



        </BottomNavigation>
      </Paper>
        </Box>
    )

}
