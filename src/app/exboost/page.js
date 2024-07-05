"use client"
import * as React from 'react';
import { Accordion, AccordionActions, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { use } from 'react';

const ex_ability = require('./ex_ability.json');
const ex_status = require('./ex_status.json');

function ListOfEXboosts() {
    return(
        <div style={{
            // margin: "30px",
            padding: "30px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
        }}>
            {Object.keys(ex_ability).map(key => {
                if(ex_ability.hasOwnProperty(key)) {
                    return (
                        <Accordion>
                            <AccordionSummary>
                                {ex_ability[key][0]}
                            </AccordionSummary>
                            <AccordionDetails>
                                {key}
                            </AccordionDetails>
                        </Accordion>
                    );
                }
            })}
        </div>
    )
}

export default function Home() {

    return(
        <div>
            <ListOfEXboosts />

        </div>
    )
}