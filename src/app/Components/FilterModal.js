import React, { useState } from 'react';
import { Box, Button, Divider, Typography, ToggleButton, ToggleButtonGroup, Dialog } from '@mui/material';

import OneStar from '../unit-songs/rarity/star1.png';
import TwoStar from '../unit-songs/rarity/star2.png';
import ThreeStar from '../unit-songs/rarity/star3.png';
import FourStar from '../unit-songs/rarity/star4.png';
import FiveStar from '../unit-songs/rarity/star5.png';

import Fire from '../unit-songs/elements/element_red.png';
import Water from '../unit-songs/elements/element_blue.png';
import Wind from '../unit-songs/elements/element_green.png';
import Thunder from '../unit-songs/elements/element_yellow.png';
import Light from '../unit-songs/elements/element_white.png';
import Dark from '../unit-songs/elements/element_black.png';

import Image from 'next/image';

const FilterModal = (props) => {
    const Rarities = [
        { id: 1, image: OneStar },
        { id: 2, image: TwoStar },
        { id: 3, image: ThreeStar },
        { id: 4, image: FourStar },
        { id: 5, image: FiveStar }
    ]
    
    const Elements = [
        { id: 'fire', image: Fire },
        { id: 'water', image: Water },
        { id: 'wind', image: Wind },
        { id: 'thunder', image: Thunder },
        { id: 'light', image: Light },
        { id: 'dark', image: Dark }
    ]
    const [open, setOpen] = useState(false);
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [selectedRarity, setSelectedRarity] = useState([]);

    const Attributes = ['fire', 'water', 'wind', 'thunder', 'light', 'dark']
    const Rarity = [1, 2, 3, 4, 5]
    const Race = ["Aquatic", "Beast", "Demom", "Dragon", "Human", "Mecha", "Plant", "Sprite", "Undead", "Youkai"]
    const Role = ["Bow", "Sword", "Special", "Fist", "Support"]

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function isArrayValid(array) {
        const allAttributesLowerCase = Attributes.map(attribute => attribute.toLowerCase());
        const allRarityString = Rarity.map(rarity => rarity.toString());
        
        const isAttributeArray = array.every(item => {
            if (typeof item === 'string') {
                return allAttributesLowerCase.includes(item.toLowerCase());
            } else {
                return false;
            }
        });
        
        const isRarityArray = array.every(item => {
            if (typeof item === 'number') {
                return allRarityString.includes(item.toString());
            } else {
                return false;
            }
        });
    
        if (isAttributeArray) {
            return "Attribute";
        } else if (isRarityArray) {
            return "Rarity";
        } else {
            return false;
        }
    }

    function filterObjects(array, key, values) {
        return array.filter(obj => {
            if (key === "Attribute") {
                return values.includes(obj.Attribute.toLowerCase());
            } else if (key === "Rarity") {
                return values.includes(obj.Rarity);
            } else {
                return false;
            }
        });
    }

    const handleFilter = (event, newFilter, setFilter) => {
        // Merge the new selected values with the existing selected values
        const updatedFilter = Array.isArray(newFilter) ? [...newFilter] : [newFilter];
        setFilter(updatedFilter);
    
        console.log("Currently filtering Attributes: ", selectedAttributes, "Rarity: ", selectedRarity);        
        
        let tempFilter = [...props.filter]; // Make a shallow copy to avoid mutating props directly
        // Use the filterObjects function to filter
        // First, check if newFilter is rarity or attribute
        const typeOfFilter = isArrayValid(updatedFilter);
        tempFilter = filterObjects(tempFilter, typeOfFilter, updatedFilter);
    
        props.setFilter(tempFilter);
    
        console.log("TempFilter", tempFilter);
    };
    
    
    
    
    

    const style = {

        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div>
            <Button onClick={handleOpen}>Filter</Button>
            <Dialog open={open} onClose={handleClose}>
                <Box
                    sx={style}
                >
                    <Divider>
                        <Typography>Attributes</Typography>
                    </Divider>
                    <ToggleButtonGroup
                        value={selectedAttributes}
                        onChange={(event, newFilter) => handleFilter(event, newFilter, setSelectedAttributes)}
                        aria-label="text attributes"
                        multiple // Enable multiple selections
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        {Elements.map((element, index) => (
                            <ToggleButton key={index} value={element.id}>
                                <Image src={element.image} alt={element.id} 
                                style={{
                                width: '60%',
                                height: 'auto'
                            }}
                                />
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>

                    <Divider>
                        <Typography>Rarity</Typography>
                    </Divider>
                    <ToggleButtonGroup
                        value={selectedRarity}
                        onChange={(event, newFilter) => handleFilter(event, newFilter, setSelectedRarity)}
                        aria-label="text rarity"
                        multiple // Enable multiple selections
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >


                        {Rarities.map((rarity, index) => (
                            <ToggleButton key={index} value={rarity.id}
>
                                <Image src={rarity.image} alt={`star-${rarity.id}`} 
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                }}
                                />
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    {selectedAttributes.map((attribute, index) => (
                        <Typography key={index}>{attribute}</Typography>
                    ))}
                </Box>
            </Dialog>
        </div>
    );
};
export default FilterModal;
