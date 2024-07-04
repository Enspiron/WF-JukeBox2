import React, { useState } from 'react';
import { Box, Button, Divider, Typography, ToggleButton, ToggleButtonGroup, Dialog } from '@mui/material';
import Rating from '@mui/material/Rating';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StyledRating from '@mui/material/Rating';
import styled from '@mui/material/styles/styled';
import Grid from '@mui/material/Grid';

function UnitEditModal(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#ff6d75',
        },
        '& .MuiRating-iconHover': {
          color: '#ff3d47',
        },
      });

    const owned_chars = props.ownedunits;
    const isUnitOwned = () => {
        for(let key in owned_chars) {
            if(key === props.devnickname) {
                return true;
            } else {
                return false;
            }
        }
    }

    const [isOwned, setOwned] = useState(isUnitOwned());

    //adding a character with no upgrades
    // {devid}: {
    //     "entry_count": 1,
    //     "evolution_level": 0,
    //     "over_limit_step": 0,
    //     "protection": false,
    //     "join_time": 1719446997,
    //     "update_time": 1719446997,
    //     "exp": 10,
    //     "stack": 0,
    //     "bond_token_list": [
    //       {
    //         "mana_board_index": 1,
    //         "status": 0
    //       },
    //       {
    //         "mana_board_index": 2,
    //         "status": 0
    //       }
    //     ],
    //     "mana_board_index": 1
    //   }

    // console.log(props.devnickname, isUnitOwned());

    return(
        <div

        >
            <img src={`https://eliya-bot.herokuapp.com/img/assets/chars/${props.devnickname}/square_0.png`} alt={props.devnickname} 
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '5px',
                    ...(isUnitOwned() ? { transform: 'none' } : { filter: 'brightness(50%)' })
                }}
                onClick={handleOpen}
                />
                <Dialog open={open} onClose={handleClose}>
                    <Box
                    style={{
                        padding: '20px',
                    }}
                    >
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Grid item>
                    {props.devnickname}
                    </Grid>
                    <Grid item>
                    {isOwned ? "Owned" : "Not Owned"}
                    </Grid>
                    </Grid>

                    </Box>
                </Dialog>
        </div>
    )

}

export default UnitEditModal;