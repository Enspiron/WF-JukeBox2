"use client";
import React from 'react'; 
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const exboosts = require('../Save/Modals/ex_boost.json');
const exstatus = require('../Save/Modals/ex_status.json');
import exBoostConverting from '../Save/Modals/exBoostConverting';
import { ExitToApp } from '@mui/icons-material';

import EquipLevel from '../Save/Edits/EquipLevel';

const Rarities = [
    { devname: "_r5", rarity: 5, index: 0 },
    { devname: "_r4", rarity: 4, index: 1 },
    { devname: "_r3", rarity: 3, index: 2 },
];

function FormEditValue({ setEdit, value, slot, type, rarity, setRarity }) {
    const [editable, setEditable] = React.useState(true);
    const [rarityEditable, setRarityEditable] = React.useState(true);
    const [inputValue, setInputValue] = React.useState(value);
    const [savedValue, setSavedValue] = React.useState(value);
    const [rarityValue, setRarityValue] = React.useState(rarity);

    const exboost = new exBoostConverting();

    const handleSave = () => {
        if (!editable) {
            setSavedValue(inputValue);
        }
        setEdit(inputValue);
        setEditable(!editable);
    };

    const handleRaritySave = () => {
        setRarityEditable(!rarityEditable);
        setRarity(rarityValue);
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleRarityChange = (event) => {
        setRarityValue(event.target.value);
    };

    return (
        <div style={{ margin: "10px" }}>
            <FormControl size="small">
                <FormGroup row>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={inputValue}
                        onChange={handleChange}
                        disabled={editable}
                        autoWidth
                        style={{ borderTopRightRadius: "0", borderBottomRightRadius: "0" }}
                    >
                        <MenuItem value="None">
                            <em>Nothing Set</em>
                        </MenuItem>
                        {exboosts["ex_boosts"][slot].map((item, index) => (
                            <MenuItem key={index} value={item.devname}>{item.name}</MenuItem>
                        ))}
                    </Select>
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={handleSave}
                        style={{ borderRadius: "0" }}
                    >
                        {!editable ? 'Save' : 'Edit EX Boost'}
                    </Button>

                    <Select
                        style={{ borderRadius: "0" }}
                        disabled={rarityEditable}
                        value={rarityValue}
                        onChange={handleRarityChange}
                        autoWidth
                    >
                        {Rarities.map((item, index) => (
                            <MenuItem key={index} value={item.rarity}>{item.rarity}</MenuItem>
                        ))}
                        
                    </Select>
                    
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={handleRaritySave}
                        style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}
                    >
                        {!rarityEditable ? 'Save' : 'Edit Rarity'}
                        
                    </Button>
                    <img src={exboost.returnIcon(rarityValue)} alt={exboost.getRarityByID(inputValue)} 
                    style={{
                    width: "40px",
                    height: "40px",
                    // position: "absolute",
                    // left: "265px"
                    }}/>
                </FormGroup>
            </FormControl>
        </div>
    );
}

function EditStatus({ value, setStatus}) {
    const [editable, setEditable] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(value);
    const [savedValue, setSavedValue] = React.useState(value);


    const boostRarity = React.useRef();

    const exboost = new exBoostConverting();

    const handleSave = () => {
        if (!editable) {
            setSavedValue(inputValue);
        }
        setStatus(inputValue);
        setEditable(!editable);
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    console.log(boostRarity)

    return(
        <div div style={{ margin: "10px" }}>
            <FormControl size="small">
                <FormGroup row>
                    <img src={exboost.returnRibbon(exboost.getRarityByID(inputValue))} alt={exboost.getRarityByID(inputValue)} 
                    style={{
                    width: "40px",
                    height: "40px",
                    position: "absolute",
                    }}/>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={inputValue}
                        onChange={handleChange}
                        disabled={!editable}
                        autoWidth
                        style={{ 
                            borderTopRightRadius: "0", 
                            borderBottomRightRadius: "0" 
                        }}
                    >
                        {exboost.getStatusus().map((item, index) => (
                            // console.log(item)
                            <MenuItem key={index} useRef={boostRarity} rarity={item.rarity} value={item.id}>HP: {item.hp} / ATK: {item.atk}</MenuItem>
                        ))}
                    </Select>
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={handleSave}
                        style={{ 
                            borderTopLeftRadius: "0",
                            borderBottomLeftRadius: "0"
                        }}
                    >
                        {editable ? 'Save' : 'Edit Status'}
                    </Button>
                </FormGroup>
            </FormControl>
        </div>
    )
}

function App() {
    const [slotA, setSlotA] = React.useState("None");
    const [slotB, setSlotB] = React.useState("None");
    const [slotARarity, setSlotARarity] = React.useState(5);
    const [slotBRarity, setSlotBRarity] = React.useState(5);

    const [exStatus, setExStatus] = React.useState(1);

    const exboost = new exBoostConverting();

    const currentBoost = {
        "status_id" : exStatus,
        "slot_a": slotA,
        "slot_b": slotB,
        "slot_a_rarity": slotARarity,
        "slot_b_rarity": slotBRarity
    }

    return (
        <div>

            <div>
                <EditStatus value={exStatus} setStatus={setExStatus}/>
                <FormEditValue setEdit={setSlotA} value={slotA} slot="slot_a" type="type" setRarity={setSlotARarity} rarity={slotARarity} />
                <FormEditValue setEdit={setSlotB} value={slotB} slot="slot_b" type="type" setRarity={setSlotBRarity} rarity={slotBRarity} />
            </div>

            <div>
                <pre style={{ padding: "10px", backgroundColor: "#f4f4f4", borderRadius: "5px", margin: "10px" }}>
                    EX Status: {exStatus}<br />
                    {slotA}<br />{JSON.stringify(exboost.searchEXBoostByDevName(slotA))}<br />
                    {slotB}<br />{JSON.stringify(exboost.searchEXBoostByDevName(slotB))}
                </pre>
                EX Boost Built:
                <pre style={{ padding: "10px", backgroundColor: "#f4f4f4", borderRadius: "5px", margin: "10px" }}>
                    {console.log(exboost.buildEXBoost(exStatus, slotA, slotB, exStatus))}
                    {JSON.stringify(exboost.buildEXBoostFromForm(currentBoost))}

                </pre>
            </div>
        </div>
    );
}

export default App;
