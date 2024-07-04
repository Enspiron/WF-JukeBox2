"use client";
const characters = require('./character.json');
const characterlist = require('./characters.json');
import * as React from 'react';
import { Accordion, AccordionActions, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { use } from 'react';

function ListOfChars(props) {
    return(
        <div style={{
            // margin: "30px",
            padding: "30px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
        }}>
                {Object.keys(characters).map(key => {
                    if(characters.hasOwnProperty(key)) {
                        return (

                            <>
                             <Accordion>
                            <AccordionSummary>
                            {characters[key][0]}
                            </AccordionSummary>
                            <AccordionDetails>
                            {key}
                            </AccordionDetails>
                            </Accordion>
                            </>
      
                        );
                    }
                })}
        </div>
    )
}

function FilterByName(name) {
    const results = [];

    for (const key in characters) {
        if (characters.hasOwnProperty(key)) {
            const entry = characters[key];
            if (entry[0].includes(name)) {
                results.push({ key, entry });
            }
        }
    }

    return results;
}

function Home() {
    const [search, setSearch] = React.useState("");
    const term = React.useRef("");
    const [results, setResults] = React.useState(characters);

    React.useEffect(() => {
        setResults(FilterByName(search));
        console.log(results);
    }, [search]);

    return(
        <div>
      
        <ListOfChars chars={results}/>
        </div>
    )
}

export default Home;