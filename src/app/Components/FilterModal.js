import React, { useState } from 'react';
import { Box, Button, Divider, Typography, ToggleButton, ToggleButtonGroup, Dialog } from '@mui/material';

import Switch from '@mui/material/Switch';

import Image from 'next/image';

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
import styled from '@mui/material/styles/styled';

const AntSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&::before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&::after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

const originalData = require('../unit-songs/characters.json').chars;

const FilterModal = (props) => {
    const Rarities = [
        { id: 1, image: OneStar },
        { id: 2, image: TwoStar },
        { id: 3, image: ThreeStar },
        { id: 4, image: FourStar },
        { id: 5, image: FiveStar }
    ];

    const Elements = [
        { id: 'fire', image: Fire },
        { id: 'water', image: Water },
        { id: 'wind', image: Wind },
        { id: 'thunder', image: Thunder },
        { id: 'light', image: Light },
        { id: 'dark', image: Dark }
    ];

    const [onlyWithSongs, setOnlyWithSongs] = useState(false);

    const [open, setOpen] = useState(false);
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [selectedRarity, setSelectedRarity] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFilter = (event, newFilter, setFilter) => {
        const updatedFilter = Array.isArray(newFilter) ? [...newFilter] : [newFilter];
        setFilter(updatedFilter);

        let tempFilter = [...props.filter];
        const typeOfFilter = isArrayValid(updatedFilter);
        tempFilter = filterObjects(tempFilter, typeOfFilter, updatedFilter);
        props.setFilter(tempFilter);
    };

    function isArrayValid(array) {
        const Attributes = ['fire', 'water', 'wind', 'thunder', 'light', 'dark'];
        const Rarity = [1, 2, 3, 4, 5];

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

    React.useEffect(() => {
        let tempFilter = props.filter;
        if (onlyWithSongs) {
            console.log("Filtering only with songs");
            console.log(tempFilter.filter(obj => obj.songs))
            tempFilter = tempFilter.filter(obj => obj.songs);
        }else {
            tempFilter = originalData;
        }


        props.setFilter(tempFilter);
    }, [onlyWithSongs]);

    function filterObjects(array, key, values) {
        if (values.length === 0) {
            return originalData;
        }

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

    return (
        <div>
            <Button onClick={handleOpen} variant="outlined">Filter</Button>
            <Dialog open={open} onClose={handleClose}>
                <Box sx={{ bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, alignItems: 'center', justifyContent: 'center' }}>
                    <Divider>
                        <Typography>Show Only With Songs?</Typography>
                    </Divider>
                    <AntSwitch
                        checked={onlyWithSongs}
                        onChange={() => setOnlyWithSongs(!onlyWithSongs)}
                        inputProps={{ 'aria-label': 'controlled' }}

                    />
                    <Divider>
                        <Typography>Attributes</Typography>
                    </Divider>
                    <ToggleButtonGroup
                        value={selectedAttributes}
                        onChange={(event, newFilter) => handleFilter(event, newFilter, setSelectedAttributes)}
                        aria-label="text attributes"
                        multiple
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        {Elements.map((element, index) => (
                            <ToggleButton key={index} value={element.id}>
                                <Image src={element.image} alt={element.id} style={{ width: '60%', height: 'auto' }} />
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
                        multiple
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        {Rarities.map((rarity, index) => (
                            <ToggleButton key={index} value={rarity.id}>
                                <Image src={rarity.image} alt={`star-${rarity.id}`} style={{ width: '100%', height: 'auto' }} />
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Box>
            </Dialog>
        </div>
    );
};

export default FilterModal;
