import React, { useState, useEffect } from 'react';
import { Box, Dialog, Button } from '@mui/material';
import PropTypes from 'prop-types';
import EquipLevel from '../Edits/EquipLevel';
const equipments = require('../equipment.json');

function EquipmentModal(props) {
    const { setFileContent, fileContent, devnickname, ownedequipment } = props;

    const [open, setOpen] = useState(false);
    const [equipLevel, setEquipLevel] = useState(0);

    useEffect(() => {
        const selectedEquip = getSelectedEquipmentData();
        if (selectedEquip) {
            setEquipLevel(selectedEquip.level - 1);
        }
    }, [devnickname, fileContent]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isEquipmentOwned = () => ownedequipment.hasOwnProperty(devnickname);

    const getEquipmentByID = (id) => {
        return equipments[id]?.[0];
    };

    const getEquipByDevName = (devname) => {
        return Object.keys(equipments).find(key => equipments[key][0] === devname);
    };

    const makeEquip = (equipid) => ({
        level: 1,
        enhancement_level: 0,
        protection: false,
        stack: 0
    });

    const addEquipToFile = (equip) => {
        const equipID = getEquipByDevName(equip);
        if (equipID) {
            const userEquips = fileContent.user_equipment_list || {};
            const newEquip = makeEquip(equipID);
            userEquips[equipID] = newEquip;

            const updatedFileContent = {
                ...fileContent,
                user_equipment_list: { ...userEquips }
            };

            setFileContent(updatedFileContent);
        }
    };

    const removeEquipFromFile = (equip) => {
        const equipID = getEquipByDevName(equip);
        if (equipID) {
            const userEquips = fileContent.user_equipment_list || {};
            delete userEquips[equipID];

            const updatedFileContent = {
                ...fileContent,
                user_equipment_list: { ...userEquips }
            };

            setFileContent(updatedFileContent);
        }
    };

    const checkIfEquipExists = (equip) => {
        const userEquips = fileContent.user_equipment_list || {};
        const equipID = getEquipByDevName(equip);
        return userEquips[equipID] === undefined;
    };

    const getSelectedEquipmentData = () => {
        const userEquip = fileContent.user_equipment_list || {};
        for (let id in userEquip) {
            if (getEquipmentByID(id) === devnickname) {
                return userEquip[id];
            }
        }
        return null;
    };

    return (
        <div>
            <img 
                src={`https://eliya-bot.herokuapp.com/img/assets/item/equipment/${devnickname}.png`} 
                alt={devnickname}
                style={{
                    width: '40px',
                    height: '40px',
                    filter: isEquipmentOwned() ? 'none' : 'brightness(50%)'
                }}
                onClick={handleOpen}
            />
            <EquipLevel 
            style={{
                height: '5px',
            }}
            level={equipLevel} />
            <Dialog open={open} onClose={handleClose}>
                <Button
                    variant="outlined"
                    style={{ margin: '5px', height: '20px' }}
                    onClick={() => 
                        checkIfEquipExists(devnickname) 
                            ? addEquipToFile(devnickname) 
                            : removeEquipFromFile(devnickname)
                    }
                    color={isEquipmentOwned() ? 'error' : 'primary'}
                >
                    {isEquipmentOwned() ? '-' : '+'}
                </Button>
                <Box style={{ padding: '20px' }}>
                    <div>{devnickname}</div>
                    <div>{JSON.stringify(getSelectedEquipmentData())}</div>
                    <EquipLevel level={equipLevel} />
                </Box>
            </Dialog>
        </div>
    );
}

EquipmentModal.propTypes = {
    setFileContent: PropTypes.func.isRequired,
    fileContent: PropTypes.object.isRequired,
    devnickname: PropTypes.string.isRequired,
    ownedequipment: PropTypes.object.isRequired,
    equips: PropTypes.array
};

export default EquipmentModal;
