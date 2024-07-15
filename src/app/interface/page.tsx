"use client"
import { Bigshot_One } from "next/font/google";
import React from "react";
const Save = require('./save.ts');
const BigSave = require('./Enspiron Save.json');
const SmallSave = require('./Dummy Save.json');

import Button from '@mui/material/Button';
import { TextField } from "@mui/material";

export default function Page() {
    const [save, setSave] = React.useState<typeof Save>(BigSave);
    const [smallSave, setSmallSave] = React.useState<typeof Save>(SmallSave);

    const input = React.useRef<HTMLInputElement>(null);

    console.log(save);
    // console.log(BigSave);
    // console.log(save.data.user_character_list);

    for (let key in smallSave.data.user_character_list) {
        console.log(key);
    }

    Save.removeCharacter(0, smallSave);
    Save.addCharacter(111007, smallSave);

    console.log(Save.getCharacters(smallSave));

    console.log(JSON.stringify(smallSave.user_character_list))

    function handleClick() {
        // add to character list
        const value = input.current?.value;
        console.log(value);
        Save.addCharacter(value, save);
        console.log(save.data.user_character_list);

        // Create a new object to trigger re-render
        setSave({...save});
    }

    const characters = Save.getCharacters(save);

    return (
        <div >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(15, 1fr)" }}>

            {save.data.user_info.name}
            {characters.map((char: any, index: number) => {
                return <div key={index}>{index}</div>;
                })}
            </div>
            <TextField 
                id="outlined-basic"
                inputRef={input}
                type="number"
                label="Name" 
                variant="outlined" 
            />
            <Button variant="contained" onClick={handleClick}>
                Submit
            </Button>
        </div>
    );
}
