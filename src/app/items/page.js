"use client"
import React from 'react';
import Dialog from '@mui/material/Dialog';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const items = require('./item.json');

const categories = [
    {name: "Consumables", id: 2},
    {name: "Training Items", id: 0},
    {name: "Items used for armament augmentation", id: 1},
    {name: "Event Items", id: 9},
    {name: "Trading Items", id: 15},
    {name: "Ticket", id: 8},
    {name: "Ability Core", id: 11},
    {name: "Wrightpiece", id: 16},
    {name: "Star Speck", id: 20},
];

export default function Home() {
    const GetAllItemsWithCategoryID = (id) => {
        const result = [];
        for (const key in items) {
            const item = items[key];
            if (parseInt(item[5]) === id) {
                result.push(items[key]);
            }
        }
        return result;
    };

    const GetIDfromName = (name) => {
        for (const key in items) {
            const item = items[key];
            if (item[0] === name) {
                return key;
            }
        }
    }

    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);

    const handleClickOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedItem(null);
    };

    return (
        <div>
            {categories.map((category) => (
                <Accordion key={category.id}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography>{category.name} : ID = {category.id}</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                   
                   style={{
                    maxWidth: '100%', // Ensures the width doesn't exceed the screen width
                    maxHeight: '400px', // Adjust the max height as needed
                    overflowY: 'auto' // Enables vertical scrolling
                }}
                    >
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: '0px' }}>
                            {GetAllItemsWithCategoryID(category.id).map((item) => (
                                <div key={GetIDfromName(item[0])} style={{ textAlign: 'center' }}>
                                    <img 
                       
                                        src={`https://wfjukebox.b-cdn.net/big${item[2]}.png`} 
                                        // alt={item[0]} 
                                        style={{ 
                                            height: '40px',
                                            // width: '40px',
                                            cursor: 'pointer', 
                                            // border: '1px solid black',
                                            // padding: '5px',

                                        }} 
                                        onClick={() => handleClickOpen(item)}
                                    />
                                    {/* <Typography>{item[0]}</Typography> */}
                                </div>
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}

            <Dialog open={open} onClose={handleClose}>
                <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '20px',
                
                }}
                >

                {selectedItem && (
                    <>
                        <img 
                            src={`https://wfjukebox.b-cdn.net/big${selectedItem[2]}.png`} 
                            alt={selectedItem[0]} 
                            style={{ width: '100px' }} 
                            />
                        <Typography>Devname: {selectedItem[0]}</Typography>
                        <Typography>Name: {selectedItem[1]}</Typography>
                        <Typography>Directory: {selectedItem[2]}</Typography>
                        <Typography
                        style={{
                            backgroundColor: 'silver',
                            padding: '5px',
                        }}
                        >{selectedItem[4]}</Typography>
                    </>
                )}
            </div>
            </Dialog>
        </div>
    );
}
