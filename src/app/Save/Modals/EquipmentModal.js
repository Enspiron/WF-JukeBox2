import React, { useState } from 'react';
import { Box, Button, Divider, Typography, ToggleButton, ToggleButtonGroup, Dialog } from '@mui/material';
import Rating from '@mui/material/Rating';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StyledRating from '@mui/material/Rating';
import styled from '@mui/material/styles/styled';

//https://eliya-bot.herokuapp.com/img/assets/item/equipment/{props.devnickname}.png

function EquipmentModal(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isEquipmentOwned = () => {
        for(let key in props.ownedequipment) {
            if(key === props.devnickname) {
                return true;
            } else {
                return false;
            }
        }
    }


    return(
        <div>
            <img src={`https://eliya-bot.herokuapp.com/img/assets/item/equipment/${props.devnickname}.png`} alt={props.devnickname} 
            style={{
                width: '40px',
                height: '40px',
                // borderRadius: '5px',
                ...(isEquipmentOwned() ? { transform: 'none' } : { filter: 'brightness(50%)' })

            }}
            onClick={handleOpen}
                />
                <Dialog open={open} onClose={handleClose}>
                    <Box
                    style={{
                        padding: '20px',
                    }}
                    >
                    {props.devnickname}


                    </Box>
                </Dialog>
        </div>
    )

}

export default EquipmentModal;