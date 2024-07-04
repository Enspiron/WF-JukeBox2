// FileUploadButton.js

'use client';

import * as React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Input from '@mui/material/Input';
import DownloadIcon from '@mui/icons-material/Download';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import CloseIcon from '@mui/icons-material/Close';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import Image from 'next/image';

const convert_exp = require('./convert_exp.js');

const Dummy = require('./Enspiron Save.json');

import {Button, FormGroup, TextField, withStyles} from '@mui/material';
import { Check } from '@mui/icons-material';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
const character_id = require('./character.json');
const equipment_id = require('./equipment.json');

import UnitEditModal from './Modals/UnitEditModal.js';
import EquipmentModal from './Modals/EquipmentModal.js';

import Equipment from './Edits/Equipment.js';
import Characters from './Edits/Characters.js';

const Item = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(0),
    textAlign: 'center',
    
    color: theme.palette.text.secondary,
    justifyContent: 'center',
  
}));

async function handleFileUpload(e, setFileContent, setFileName) {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const json = await action(formData);

    setFileContent(json["data"]);
    setFileName(e.target.files[0].name);
}

async function action(formData) {
    const file = formData.get('file');

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const json = JSON.parse(e.target.result);
                resolve(json);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = function(error) {
            reject(error);
        };

        reader.readAsText(file);
    });
}

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&::before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

export default function FileUploadButton() {
    const [fileContent, setFileContent] = React.useState(null);
    const [fileName, setFileName] = React.useState(null);
    const [type, setType] = React.useState('data');
    const [settings, setSettings] = React.useState([]);

    const debugMode = false;
    if(debugMode) {
        // handleFileUpload({target: {files: [new File([JSON.stringify(Dummy)], 'Dummy_Save.json')] }}, setFileContent, setFileName);
        if (fileContent==null) {
            handleFileUpload({target: {files: [new File([JSON.stringify(Dummy)], 'Enspiron Save.json')] }}, setFileContent, setFileName);

        }

    }

    const [keys, setKeys] = React.useState([]);

    const [expanded, setExpanded] = React.useState('panel1');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
      };

      
      

    for (let key in fileContent) {
        keys.push(key);
    }


    function FormEditValue({ name, setEdit, value, fileContent, type }) {
        const [editable, setEditable] = React.useState(true);
        const [inputValue, setInputValue] = React.useState(value);
        const [savedValue, setSavedValue] = React.useState(value);

        const inputRef = React.useRef();
    
        const StyledTextField = styled(TextField)(({ theme }) => ({
            '& fieldset': {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
            },
        }));
    
        const StyledButton = styled(Button)(({ theme }) => ({
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            textTransform: 'none',
        }));
    
        const handleSave = () => {
            if (!editable) {
                const newValue = inputRef.current.value;
                // console.log(name, 'saved value ', newValue);
                // alert(name + ' saved value ' + newValue);
                setSavedValue(newValue);
                setEdit(prevState => ({
                    ...prevState,
                    [type]: {
                        ...prevState[type],
                        [name]: isNaN(newValue) ? newValue : parseFloat(newValue)
                    }
                }));
            }
            setEditable(!editable);
        };
    
        return (
            <div style={{margin: "10px"}}>
                <FormGroup row>
                    <TextField 
                    id="filled-basic"
                        variant="filled" 
                        placeholder={value}
                        label={name}
                        type="text"
                        disabled={editable}
                        inputRef={inputRef}
                        defaultValue={savedValue}
                    />
                    <StyledButton 
                        variant="contained" 
                        disableElevation
                        onClick={handleSave}
                    >
                        {!editable ? 'Save' : 'Edit'}
                    </StyledButton>
                </FormGroup>
            </div>
        );
    }

    // console.log(getValues());

    // console.log(keys);

    const handleDownload = () => {
        const blob = new Blob([JSON.stringify(fileContent, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download ="Modified " + fileName || 'download.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    function AddUnitToRoster(id) {
        //check if id is real
        if (character_id[id] == undefined) {
            console.log("invalid id");
            return;
        }

        //check if unit exists already in roster
        if(fileContent["user_character_list"][id] != undefined) {
            console.log("unit already exists in roster");
            return;
        }

        console.log("adding ", character_id[id][0], " to roster");
        const tempFile = fileContent;
        tempFile["user_character_list"][id] = {
            "entry_count": 1,
            "evolution_level": 0,
            "over_limit_step": 0,
            "protection": false,
            "join_time": 1719446997,
            "update_time": 1719446997,
            "exp": 10,
            "stack": 0,
            "bond_token_list": [
              {
                "mana_board_index": 1,
                "status": 0
              },
              {
                "mana_board_index": 2,
                "status": 0
              }
            ],
            "mana_board_index": 1
          }

        setFileContent(tempFile);
    }

    function RemoveUnitFromRoster(id) {
        const tempFile = fileContent;
        if(tempFile["user_character_list"][id] == undefined) {
            console.log("unit does not exist in roster");
            return;
        }

        console.log("removing ", character_id[id][0], " from roster");
        delete tempFile["user_character_list"][id];
        setFileContent(tempFile);
    }

    function SearchDevNameByID(id) {
        var result;
        for(let key in character_id) {
            if (key == id) {
                // console.log("found ", character_id[key][0]);
                result = character_id[key][0];
                return result;
            }
        }
    }



    function CheckOwnedCharacters() {
        //loop through fileContent["user_character_list"]
        //the key is the character number
        //make a list of MakeCharacterList() key value : character number

        const user_list = fileContent["user_character_list"];
        const owned_chars = {};
        for (let key in user_list) {
            // console.log("with id you have ", key);
            // console.log("you own ", SearchDevNameByID(key));
            owned_chars[SearchDevNameByID(key)] = key;
        }

        return owned_chars;

    }

    if(fileContent != null) {
        // CheckOwnedCharacters();
        console.log("owned characters: ", CheckOwnedCharacters());
    }

    function CheckOwnedEquipment() {
        //loop through fileContent["user_character_list"]
        //the key is the character number
        //make a list of MakeCharacterList() key value : character number

        const user_list = fileContent["user_equipment_list"];
        const owned_equips = {};
        for (let key in user_list) {
            // console.log("with id you have ", key);
            // console.log("you own ", SearchDevNameByID(key));
            owned_equips[SearchDevNameByID(key)] = key
        }

        return owned_equips;
    }



    // console.log(MakeCharacterList())

    const convert = new convert_exp();

    // console.log("converting lv250 to exp:", convert.level_to_exp(250));
    // console.log("converting 8106205 exp to lv:", convert.exp_to_level(8106205));

    function RankSlider() {
        const [value, setValue] = React.useState(convert.exp_to_level(fileContent["user_info"]["rank_point"]));
        const [canEdit, setCanEdit] = React.useState(false);
        const handleSliderChange = (event, newValue) => {
            setValue(newValue);
        };

        const handleInputChange = (event) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value));
        };

        const handleRankSave = () => {
            // setValue(convert.exp_to_level(fileContent["user_info"]["rank_point"]));

            setCanEdit(!canEdit);
            const level = convert.level_to_exp(value);
            if(canEdit) {
            setFileContent(prevState => ({
                ...prevState,
                user_info: {
                    ...prevState.user_info,
                    rank_point: level
                }
            }));
            // if(value==16412378){
            //     setValue(250);
            // }
            // setValue(convert.exp_to_level(fileContent["user_info"]["rank_point"]));

        }
        }

        const handleBlur = () => {
            if (value < 0) {
              setValue(0);
            } else if (value > 250) {
              setValue(250);
            }
          };

          return(
            <div
            style={{
                backgroundColor: canEdit ? 'rgba(0, 0, 0, 0.05)' : 'lightgrey',
                padding: '15px',
                borderRadius: '5px',
            }}
            >
                    <Box sx={{ width: 250 }} 
     
                    >
      <Typography id="input-slider" gutterBottom>
        Set Rank Level
      </Typography>
      <Grid container spacing={2} alignItems="center"

      >
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max={250}
            disabled={!canEdit}

          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 250,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
            disabled={!canEdit}
          />
        </Grid>
        <Button
        variant="contained"
        disableElevation
        style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            textTransform: 'none',
        }}


                        color="primary"
                        onClick={handleRankSave}
        >{canEdit ? "Save" : "Edit"}
        </Button>
      </Grid>
    </Box>
            </div>
          )

    }

    // AddUnitToRoster(10)

    return (
      

        <div>
            {/* <FormEditValue name="test" />
            <FormEditValue name="test2" /> */}
            <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '10px',
            
            }}
            >
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload file
                <Input type="file" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, setFileContent, setFileName)} />
            </Button>
                {fileContent && (
                    <>
                    <Button style={{ marginLeft: '10px' }}
                        variant="contained"
                        color="primary"
                        startIcon={<DownloadIcon />}
                        onClick={handleDownload}
                    >
                        Download file
                    </Button>
                    {/* <Button style={{ marginLeft: '10px' }}
                        variant="contained"
                        color="primary"
                        // startIcon={<CloseIcon />}
                        onClick={setFileContent(null)}
                    >Close
                    </Button> */}
                    </>
                )}
            </div>  
            <div>
                {fileContent && 
                <div>
                <div>

        <div style={{margin: '10px'}}>           
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
        transitionDuration="0"
        >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>User Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
        <div

        >
        <Grid container spacing={1}
           direction="row"
           alignItems="flex-end"
           justify="center"
        >
            <Grid item xs={4}

            >
            </Grid>
            <Grid item xs={4} container justifyContent='center'>        
                <RankSlider />
            </Grid>
            <Grid item xs={4}

            >
            </Grid>
            <Grid item xs={4}
            container
            justifyContent='center'
            >

                <FormEditValue name="name" value={fileContent["user_info"]["name"]} setEdit={setFileContent} fileContent={fileContent} type="user_info"/>
            </Grid>
            <Grid item xs={4} container justifyContent='center'>
                <FormEditValue name="stamina" value={fileContent["user_info"]["stamina"]} setEdit={setFileContent} fileContent={fileContent} type="user_info"/>
            </Grid>
            <Grid item xs={4} container justifyContent='center'>
                <FormEditValue name="free_vmoney" value={fileContent["user_info"]["free_vmoney"]} setEdit={setFileContent} fileContent={fileContent} type="user_info"/>
            </Grid>
            <Grid item xs={4} container justifyContent='center'>
                <FormEditValue name="free_mana" value={fileContent["user_info"]["free_mana"]} setEdit={setFileContent} fileContent={fileContent} type="user_info"/>
            </Grid>
            <Grid item xs={4} container justifyContent='center'>
                <FormEditValue name="exp_pool" value={fileContent["user_info"]["exp_pool"]} setEdit={setFileContent} fileContent={fileContent} type="user_info"/>
            </Grid>
            <Grid item xs={4} container justifyContent='center'>
                <FormEditValue name="comment" value={fileContent["user_info"]["comment"]} setEdit={setFileContent} fileContent={fileContent} type="user_info"/>
            </Grid>
        </Grid>

        </div>
                   
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header"
        transitionDuration="0"
        >
          <Typography>Edit Characters</Typography>


        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Characters userlist={fileContent}/>

          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Edit Equipment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Equipment fileContent={fileContent}/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>
                </div>
                {/* <pre
                style={{
                    margin: '10px',
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #ddd',
                    height: '400px',
                    overflow: 'auto',
                }}
                >{JSON.stringify(fileContent, null, 2)}</pre> */}
                </div>}
            </div>
        </div>
    );
}
