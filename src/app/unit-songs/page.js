"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { useRouter } from 'next/router';

import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";

import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Stack from "@mui/material/Stack";
import Image from "next/image";
import ToolTip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import useMediaQuery from "@mui/material/useMediaQuery";

import styles from "../page.module.css";

import FilterChars from "./FilterChars";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { ThemeProvider } from "@mui/material/styles";
// import theme from "../../theme";

import {Suspense} from "react";
import SuspenseImage from '../Components/SuspenseImage.js'

import Fire from "./elements/element_red.png";
import Water from "./elements/element_blue.png";
import Wind from "./elements/element_green.png";
import Thunder from "./elements/element_yellow.png";
import Dark from "./elements/element_black.png";
import Light from "./elements/element_white.png";

import Five from "./rarity/star5.png";
import Four from "./rarity/star4.png";
import Three from "./rarity/star3.png";
import Two from "./rarity/star2.png";
import One from "./rarity/star1.png";

import CardActionArea from "@mui/material/CardActionArea";
import FilterModal from '../Components/FilterModal.js'

import { Popover, Typography } from "@mui/material";

// import Loading from './loading.js'

import Character from "../../Character.js";
import BottomNavigation from "../Components/BottomNavigation.js";

import { Filter } from "@mui/icons-material";
import MP3Player from "./UnitComponents/MP3Player.js";
import Art from './UnitComponents/Art.js';
import UnitKit from "./UnitComponents/UnitKit.js";
import Soundboard from "./UnitComponents/Soundboard.js";
import DesktopMP3Player from "./UnitComponents/DesktopMP3Player";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import PropTypes from 'prop-types';

//set title to "Unit Songs"
// export const metadata = {
//     title: "Unit Songs",
//     description: "Unit Songs"
// };

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(1.5),
    border: 0,
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      marginLeft: -1,
      borderLeft: "1px solid transparent",
    },
}));



export default function Home() {
  const charFiltering = new FilterChars();
  const [attributes, setAttributes] = React.useState(() => []);
  const [rarity, setRarity] = React.useState(() => []);
  const [term, setTerm] = React.useState(() => "");

  const [clickedUnit, setClickedUnit] = React.useState(() => null);
  const [songURL, setSongURL] = React.useState(() => null);
  const [songName, setSongName] = React.useState(() => "Nothing Clicked");
  const [currentPage, setCurrentPage] = React.useState(() => "Music");

  const [rarityWidth, setRarityWidth] = React.useState(() => 72);

  const isDesktop = useMediaQuery("(min-width: 800px)");

  const [filter, setFilter] = React.useState(() => charFiltering.Chars);

  const [options, setOptions] = React.useState(() => "Music");
  const [open, setOpen] = React.useState(() => false);


  const handleOptionChange = (event) => {
    setOptions(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const unit = new Character(clickedUnit);

  async function getChars() {
    const charList = charFiltering.Chars;
    setFilter(charList);
    return charList;
  }

  const handleFormat = (event, newFormats) => {
    setAttributes(newFormats);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleRarity = (event, newRarity) => {
    console.log("NEW RARITY",newRarity);
    setRarity(newRarity);
  };

  React.useEffect(() => {
    !isDesktop ? setRarityWidth(48) : setRarityWidth(72);
  });

  React.useEffect(() => {
    // setFilter(FilterChars.setf
    console.log(attributes);
    // console.log("Filter Check", charFiltering.setFilterByAttribute(attributes, filter));
    setFilter(charFiltering.setFilterByAttribute(attributes, filter));
    if (attributes.length === 0) {
      setFilter(
        charFiltering.setFilterByAttribute([
          "Fire",
          "Water",
          "Wind",
          "Thunder",
          "Dark",
          "Light",
        ], filter),
      );
    }
  }, [attributes]);

  React.useEffect(() => {
    // setFilter(FilterChars.setf
    console.log(rarity);
    // console.log("Filter Check", charFiltering.setFilterByRarity(rarity, filter));
    setFilter(charFiltering.setFilterByRarity(rarity, filter));
    if (rarity.length === 0) {
      setFilter(charFiltering.setFilterByRarity(["5", "4", "3", "2", "1"], filter));
    }
  }, [rarity]);

  React.useEffect(() => {
    // setFilter(FilterChars.setf
    console.log(term);
    // console.log("Filter Check", charFiltering.setFilterByRarity(rarity, filter));
    setFilter(
      charFiltering.Chars.filter((char) =>
        char.ENName.toLowerCase().includes(term.toLowerCase()),
      ),
    );
    if (term.length === 0) {
      setFilter(charFiltering.Chars);
    }
  }, [term]);

  React.useEffect(() => {
    // setFilter(FilterChars.setf
    console.log(filter);
    // console.log("Filter Check", charFiltering.setFilterByRarity(rarity, filter));
    setFilter(filter);
  }, [filter]);

  const TabList = [
    { label : "Music"},
    { label : "Art"},
    { label : "Kit"},
    { label : "Soundboard"},
  ]

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  }

  function Filtering() {


    return filter.map((char) => {
      const [anchorEl, setAnchorEl] = React.useState(null);

      const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handlePopoverClose = () => {
        setAnchorEl(null);
      };
      return (
          <Item
            style={{
              cursor: 'pointer',
              padding: "1px 1px 0px 1px", // Remove bottom padding
              height: "fit-content",
              margin: "1px",
              // border: "1px solid blue",

            }}                          
            onClick={() => {
              setClickedUnit(char.DevNicknames);
              unit.changeUnit(clickedUnit);
            }}
          >
            <CardActionArea>
            <img
              src={charFiltering.getCharIcon(char.DevNicknames)}
              // alt={char.DevNicknames}
              // style={{border: "1px solid red"}}
              width={50}
              height={50}
              style={{
                // borderRadius: "80%",
              }}
            />
            </CardActionArea>
            <Popover>
              <Typography>{char.ENName}</Typography>
            </Popover>
          </Item>
      );
    })
  }

  return (
    <div>
      {clickedUnit == null ? (
        <div>
          <Box>
            <Stack
              style={{ margin: "5px", backgroundColor: "rgba(0,0,0,0.02)",}}
              spacing={0.5}
              {...(isDesktop
                ? {
                    direction: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "sticky",
                  }
                : { direction: "column" })}
            >
              <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                onChange={(e) => {
                  setTerm(e.target.value);
                }}
              />

              {/* <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <StyledToggleButtonGroup
                  size="small"
                  value={attributes}
                  onChange={handleFormat}
                  aria-label="text formatting"
                  
                >
                  <ToggleButton value="Fire">
                    <Image src={Fire} alt="Fire" width={20} height={20} />
                  </ToggleButton>
                  <ToggleButton value="Water">
                    <Image src={Water} alt="Water" width={20} height={20} />
                  </ToggleButton>
                  <ToggleButton value="Wind">
                    <Image src={Wind} alt="Wind" width={20} height={20} />
                  </ToggleButton>
                  <ToggleButton value="Thunder">
                    <Image src={Thunder} alt="Thunder" width={20} height={20} />
                  </ToggleButton>
                  <ToggleButton value="Dark">
                    <Image src={Dark} alt="Dark" width={20} height={20} />
                  </ToggleButton>
                  <ToggleButton value="Light">
                    <Image src={Light} alt="Light" width={20} height={20} />
                  </ToggleButton>
                </StyledToggleButtonGroup>
              </Paper> */}

              {/* <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <StyledToggleButtonGroup
                  size="small"
                  value={rarity}
                  onChange={handleRarity}
                >
                  <ToggleButton value="5">
                    <Image
                      src={Five}
                      alt="Five"
                      width={rarityWidth}
                      height="auto"
                    />
                  </ToggleButton>
                  <ToggleButton value="4">
                    <Image
                      src={Four}
                      alt="Four"
                      width={rarityWidth}
                      height="auto"
                    />
                  </ToggleButton>
                  <ToggleButton value="3">
                    <Image
                      src={Three}
                      alt="Three"
                      width={rarityWidth}
                      height="auto"
                    />
                  </ToggleButton>
                  <ToggleButton value="2">
                    <Image
                      src={Two}
                      alt="Two"
                      width={rarityWidth}
                      height="auto"
                    />
                  </ToggleButton>
                  <ToggleButton value="1">
                    <Image
                      src={One}
                      alt="One"
                      width={rarityWidth}
                      height="auto"
                    />
                  </ToggleButton>
                </StyledToggleButtonGroup>
              </Paper> */}
              <FilterModal filter={filter} setFilter={setFilter} />
              <Button
                onClick={() => {
                  setAttributes(() => []);
                  setRarity(() => []);
                  setTerm("");
                  setFilter(charFiltering.resetFilter());
                }}
                fullWidth={isDesktop ? false : true}
                variant="outlined"
                style={{ marginBottom: "auto", marginTop: "auto"}}
              >
                Reset Filter
              </Button>
              
            </Stack>

            <div>
            <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: { xs: "420px", md: "85vh" },
              overflowY: "auto",
              alignItems: "stretch",
              
            }}
          >
            

            <Grid
              container
              columnSpacing={{ xs: 1, sm: 0, md: 1 }}
              rowSpacing={{ xs: 0, sm: 0, md: 0 }}
              spacing={2}
              justifyContent="center"
            >
              <Filtering />

            </Grid>
          </Box>
            
            </div>
          </Box>
        </div>
      ) : (
        <div>
          {/* This is the page of the clicked unit */}
          <Stack>
            {/* Mobile layout */}
            {!isDesktop && (
              <Stack>
                {/* Back button  at top*/}
                {/* Conditional content based on clickedUnit */}
                {clickedUnit && (
                  <>
                    {currentPage === "Music" && (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "15px",
                          }}
                        >
                          <MP3Player char={new Character(clickedUnit)} song={songURL} clickedSong={songName} />
                        </div>
                        <List>
                          {unit.getSongs().map((song, index) => (
                            <ListItem
                              key={index}
                              style={{
                                justifyContent: "center",
                              }}
                            >
                              <ListItemButton
                                onClick={() => {
                                  setSongURL(unit.makeSongURL(song));
                                  setSongName(song);
                                }}
                                style={{
                                  justifyContent: "center",
                                }}
                              >
                                {song}
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </>
                    )}
                    {currentPage === "Art" && (
                      <>
                        <Art unit={clickedUnit} />
                      </>
                    )}
                    {currentPage === "Kit" && (
                      <>
                        <UnitKit unit={clickedUnit} />
                      </>
                    )}
                    {currentPage === "Soundboard" && (
                      <>
                        <Soundboard unit={clickedUnit} />
                      </>
                    )}
                  </>
                )}
                <BottomNavigation goback={setClickedUnit} setpage={setCurrentPage}/>

              </Stack>
            )}
            
            {/* Desktop layout */}
            {isDesktop && (<Button onClick={() => {setClickedUnit(null); setSongName("Nothing Clicked");}}              
              // fullWidth
              variant="outlined"
              style={{ margin: "15px" }}
            >
              <Stack direction="row" justifyContent="center">
                Back
              </Stack>
            </Button>)}
            {isDesktop && (
              <Stack direction="row" justifyContent="space-evenly">
                {/* Back button */}

                {/* Conditional content based on clickedUnit */}
                {clickedUnit && (
                  <>
                  <Box sx={{ width: '100%', bgcolor: 'background.paper', justifyContent: 'center', position:'absolute' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" >
                      {TabList.map((tab, index) => (
                        <Tab label={tab.label} />
                      ))}
                    </Tabs>
                    <TabPanel 
                      value={tabValue} 
                      index={0}
                      style={{
                        // border: "1px solid rgba(0,0,0,0.78)",
                        width: 'fit-content',
                        margin: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <MP3Player char={new Character(clickedUnit)} song={songURL} clickedSong={songName} />
                      <List
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          // border: "1px solid rgba(0,0,0,0.78)",
                        }}
                      >
                        {charFiltering.songURL(clickedUnit).map((song) => (
                          <ListItem
                            key={song} // Add a unique key to each list item
                            style={{
                              width: "100%",
                            }}
                          >
                            <ListItemButton
                              style={{
                                background: "rgba(55,55,55,0.12)",
                                width: '100%',
                                borderRadius: "10px",
                              }}
                              onClick={() => {
                                setSongURL(unit.makeSongURL(song));
                              }}
                            >
                              {song}
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                      <Art unit={clickedUnit} />
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                      <UnitKit unit={clickedUnit} />
                    </TabPanel>
                    <TabPanel value={tabValue} index={3}>
                      <Soundboard unit={clickedUnit} />
                    </TabPanel>
                    
                  </Box>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* <img src={charFiltering.getCharIcon(clickedUnit)} alt={clickedUnit} width={"100%"} height={"auto"} /> */}
                    </div>
                    <Stack
                      direction="column"
                      alignItems="stretch"
                      justifyContent="space-evenly"
                      width="20%"
                    >

                      {/* Audio player */}
                      {/* <ThemeProvider theme={theme}>
                        <audio
                          controls
                          src={songURL}
                          type="audio/mpeg"
                          loop
                          style={{ width: "100%" }}
                          auto
                        />
                      </ThemeProvider> */}
                    </Stack>
                  </>
                )}
              </Stack>
   
            )}
          </Stack>
        </div>
      )}
    </div>
  );
}
