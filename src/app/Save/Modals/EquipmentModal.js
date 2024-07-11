import React, { useState } from 'react';
import { Box, Button, Divider, Typography, ToggleButton, ToggleButtonGroup, Dialog } from '@mui/material';
import Rating from '@mui/material/Rating';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StyledRating from '@mui/material/Rating';
import styled from '@mui/material/styles/styled';

import EquipLevel from '../Edits/EquipLevel';
const equipments = require('../equipment.json');

//https://eliya-bot.herokuapp.com/img/assets/item/equipment/{props.devnickname}.png

function EquipmentModal(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isEquipmentOwned = () => {
        for(let key in props.ownedequipment) {
            if(key === props.devnickname) {
                return true;
            }
        }
        return false; // Move this line outside of the for loop
    }

    const getEquipmentByID = (id) => {
        for(let key in equipments) {
            if (key == id) {
                return equipments[key][0];
            }
        }
    }

    const getEquipByDevName = (devname) => {
        for(let key in equipments) {
            if (equipments[key][0] == devname) {
                return key;
            }
        }
    }

    function getSelectedEquipmentData() {
        const user_equip = props.fileContent;
        for(let id in user_equip) {
            if (getEquipmentByID(id) == props.devnickname) {
                return user_equip[id];
            }
        }

        return false;
        // const selected_equipment = user_equip[props.devnickname];
        // return selected_equipment;
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
                    {JSON.stringify(getSelectedEquipmentData())}
                    <EquipLevel level={getSelectedEquipmentData()["level"]-1} />


                    </Box>
                </Dialog>
        </div>
    )

}

export default EquipmentModal;