"use client"
import React from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function stringToDate(str) {
    const date = new Date(str.replace(' ', 'T'));
    return date;
}

const advent_event = require('./event/advent_event.json')
const daily_challenge_point = require('./event/daily_challenge_point.json')
const carnival_event = require('./event/carnival_event.json')
const raid_event = require('./event/raid_event.json')
const ranking_event_single_quest = require('./event/ranking_event_single_quest.json')
const rush_event = require('./event/rush_event.json')
const story_event = require('./event/story_event.json')
const world_story_event = require('./event/world_story_event.json')


function daily_challenge(json) {
    let list = [];
    for (let key in json) {
        // console.log(json[key]);

        list.push({
            "event_id": json[key][0],
            "event_name": json[key][4],
            "event_image": json[key][5],
            "event_description": json[key][6],
            "event_date": json[key][7],
        });
    }

    return list;
}

function adventEvent(json) {
    let list = [];
    for (let key in json) {
        // console.log(json[key]);

        list.push({
            "event_id": json[key][0],
            "event_name": json[key][2],
            "event_image": json[key][5],
            "event_description": json[key][6],
            "event_date": json[key][23],
        });
    }

    return list;

}

function carnivalEvent(json) {
    let list = [];
    for (let key in json) {
        let event = json[key];

        // Ensure the event has enough elements to avoid undefined errors
        if (event.length >= 21) {
            list.push({
                "event_id": event[0],
                "event_name": event[1],
                "event_image": event[3],
                "event_description": event[4] || '',
                "event_date": event[20],
            });
        }
    }

    return list;
}


function raidEvent(json) {
    let list = [];
    for (let key in json) {
        // console.log(json[key]);

        list.push({
            "event_id": json[key][0],
            "event_name": json[key][1],
            "event_image": json[key][4].replace(/,\(None\),\(None\)$/, ''),
            "event_description": json[key][4].replace(/,\(None\),\(None\)$/, ''),
            "event_date": json[key][20],
        });
    }

    return list;
}

function rankingEventSingleQuest(json) {
    let list = [];
    let i = 1;
    for (let key in json) {
        // console.log(json[key]);
        // console.log(json["2"]);
        const event = json[i];
        
        console.log(event["1"][3]);
        list.push({
            "event_id": event["1"][0],
            "event_name": event["1"][2],
            "event_image": event["1"][3],
            "event_description": json[key][5],
            "event_date": event["1"][5],
        });
        i++;
    }

    return list;
}

function rushEvent(json) {
    let list = [];
    for (let key in json) {
        // console.log(json[key]);

        list.push({
            "event_id": json[key][0],
            "event_name": json[key][1],
            "event_image": json[key][3].split(',')[1],
            "event_description": json[key][50],
            "event_date": json[key][18],
        });
    }

    return list;
 }

function storyEvent(json) {
    let list = [];
    for (let key in json) {
        // console.log(json[key]);

        list.push({
            "event_id": json[key][0],
            "event_name": json[key][2],
            "event_image": json[key][4],
            // "event_description": json[key][5],
            "event_date": json[key][17],
        });
    }

    return list;
}

function worldStoryEvent(json) {
    let list = [];
    for (let key in json) {
        // console.log(json[key]);

        list.push({
            "event_id": json[key][0],
            "event_name": json[key][2],
            "event_image": json[key][4],
            "event_description": json[key][5],
            "event_date": json[key][22],
        });
    }

    return list;
}

function createData(event_id, event_name, event_image, event_description, event_date) {
    return { event_id, event_name, event_image, event_description, event_date };
}

function MakeTable({ json }) {
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        <TableCell>Event ID</TableCell>
                        <TableCell>Event Name</TableCell>
                        <TableCell>Event Image</TableCell>
                        <TableCell>Event Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {json.map((row) => (
                        <TableRow
                            key={row.event_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.event_id}
                            </TableCell>
                            <TableCell>{row.event_name}</TableCell>
                            <TableCell>
                                <img
                                    src={"https://wfjukebox.b-cdn.net/" + row.event_image + ".png"}
                                    alt={row.event_name}
                                    style={{ maxWidth: '300px', height: 'auto' }}
                                />
                            </TableCell>
                            <TableCell>{row.event_date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default function Home() {
    // console.log(daily_challenge(daily_challenge_point));

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    


    return (
        <div>
            {/* <DateDisplay date={('2024-12-01 14:00:00')} /> */}

            {/* <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography>Advent Event Quest</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MakeTable json={daily_challenge(daily_challenge_point)} />
                </AccordionDetails>
            </Accordion> */}
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >                    
                    <Typography>Advent Event</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MakeTable json={adventEvent(advent_event)} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography>Carnival Event</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MakeTable json={carnivalEvent(carnival_event)} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography>Raid Event</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MakeTable json={raidEvent(raid_event)} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel5bh-content"
                    id="panel5bh-header"
                >
                    <Typography>Ranking Event Single Quest</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MakeTable json={rankingEventSingleQuest(ranking_event_single_quest)} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel6bh-content"
                    id="panel6bh-header"
                >
                    <Typography>Rush Event</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MakeTable json={rushEvent(rush_event)} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel7bh-content"
                    id="panel7bh-header"
                >
                    <Typography>Story Event</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MakeTable json={storyEvent(story_event)} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel8bh-content"
                    id="panel8bh-header"
                >
                    <Typography>World Story Event</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MakeTable json={worldStoryEvent(world_story_event)} />
                </AccordionDetails>
            </Accordion>

        </div>
    );
}