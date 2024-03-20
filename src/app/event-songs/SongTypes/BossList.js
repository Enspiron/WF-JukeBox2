import * as React from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';



const music = require('../music.json');

function BossList(props) {
    const [selectedBoss, setSelectedBoss] = React.useState(null);

    const handleBossChange = (event, newAlignment) => {
        if (newAlignment !== null) {
          setSelectedBoss(newAlignment);
        }
      }
    
    const control = {
        value: selectedBoss,
        onChange: handleBossChange,
        exclusive: true,
    }

    if(props.selectedBoss != null){
        return(
            <div
            style={{
                justifyContent: "center",
                alignItems: "center",
                
            }}
            >
                <Button onClick={()=>{props.setSelectedBoss(null)}}>Back</Button>
                <h1>{props.selectedBoss}</h1>
                <List
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50%",
                    margin: "auto"
                }}
                >
                    {music[props.selectedBoss].map((boss) => {
                        return(
                            <ListItemButton>
                                <img style={{margin: "auto", width: "100%"}} src={boss.banner} />
                            </ListItemButton>
                        )
                    })}
                </List>
            </div>
        )
    }

    return (
        <div>
            <h1>Boss List</h1>
            <List>
                {music.bosses.map((boss) => {
                    return(
                        <ListItemButton
                        onClick={()=>{props.setSelectedBoss(boss.name)}}
                        >
                            {boss.name}
                        </ListItemButton>
                    )
                })}
            </List>
        </div>
    );

}

export default BossList;