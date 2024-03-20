"use client"
import * as React from 'react';

import { ButtonBase, CardActionArea } from "@mui/material";

import Grid from '@mui/material/Grid';

const music = require('../music.json');

const WorldIcons = music.world.map((world) =>{
    return world.icon;
})

function StoryList(props) {
    return (
        <div>
            <h1 style={{ textAlign:"center"}}>World List</h1>
            <React.Fragment>
                <Grid container rowSpacing={{ xs: 1, md: 1 }} columnSpacing={{md: 0}} columns={{ xs: 3, sm: 5, md: 3 }}
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    // margin: 'auto'
                
                }}
                >
            {WorldIcons.map((icon, index) => {
                return(
                    <Grid item xs={1} sm={1} md={1}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        margin: 'auto'
                    
                    }}
                    >
                    <CardActionArea
                    style={{
                        width: 'fit-content',
                        borderRadius: '90%',
                        margin: 'auto'
                    }}
                    >

                    <img src={icon} alt="icon" style={{width: "100px", hover: "pointer"}} 
                    onClick={()=>{
                        props.setWorld(index);
                        
                    }}
                    />
                    </CardActionArea>
                    </Grid>
                )
            })}
                </Grid>
            </React.Fragment>
        </div>
    );

}

export default StoryList;