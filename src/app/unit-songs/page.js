"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
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

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import useMediaQuery from "@mui/material/useMediaQuery";

import styles from "../page.module.css";

import FilterChars from "./FilterChars";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

import {Suspense} from "react";
import SuspenseImage from '../Components/SuspenseImage.js'


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

// import Loading from './loading.js'

import Character from "../../Character.js";

import { Filter } from "@mui/icons-material";
import MP3Player from "./MP3Player.js";

export default function Home() {
  const charFiltering = new FilterChars();
  const [attributes, setAttributes] = React.useState(() => []);
  const [rarity, setRarity] = React.useState(() => []);
  const [term, setTerm] = React.useState(() => "");

  const [clickedUnit, setClickedUnit] = React.useState(() => null);
  const [songURL, setSongURL] = React.useState(() => null);
  const [songName, setSongName] = React.useState(() => "Nothing Clicked");

  const [rarityWidth, setRarityWidth] = React.useState(() => 72);

  const isDesktop = useMediaQuery("(min-width: 600px)");

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
    !isDesktop ? setRarityWidth(47) : setRarityWidth(72);
  });

  React.useEffect(() => {
    // setFilter(FilterChars.setf
    console.log(attributes);
    // console.log("Filter Check", charFiltering.setFilterByAttribute(attributes, filter));
    setFilter(charFiltering.setFilterByAttribute(attributes));
    if (attributes.length === 0) {
      setFilter(
        charFiltering.setFilterByAttribute([
          "Fire",
          "Water",
          "Wind",
          "Thunder",
          "Dark",
          "Light",
        ]),
      );
    }
  }, [attributes]);

  React.useEffect(() => {
    // setFilter(FilterChars.setf
    console.log(rarity);
    // console.log("Filter Check", charFiltering.setFilterByRarity(rarity, filter));
    setFilter(charFiltering.setFilterByRarity(rarity));
    if (rarity.length === 0) {
      setFilter(charFiltering.setFilterByRarity(["5", "4", "3", "2", "1"]));
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

  function Filtering() {
    return filter.map((char) => {
      return (
        <ToolTip title={char.ENName} arrow size="lg">
          <Item
            style={{
              cursor: 'pointer',
              padding: 1,
              // opacity: new Character(char.DevNicknames).hasSong() ? 1 : 0.5,
            }}                          
            onClick={() => {
              setClickedUnit(char.DevNicknames);
              unit.changeUnit(clickedUnit);
            }}
          >
            <img
              src={charFiltering.getCharIcon(char.DevNicknames)}
              alt={char.DevNicknames}
              width={50}
              height={50}
            />
            {/* <SuspenseImage src={charFiltering.getCharIcon(char.DevNicknames)} alt={char.DevNicknames} width={50} height={50} /> */}
          </Item>
        </ToolTip>
      );
    })
  }

  return (
    <div>
      {clickedUnit == null ? (
        <div>
          <Box>
            <Stack
              style={{ margin: "5px" }}
              spacing={2}
              {...(isDesktop
                ? {
                    direction: "row",
                    justifyContent: "center",
                    alignItems: "center",
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

              <Paper
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
              </Paper>

              <Paper
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
              </Paper>

              <Button
                onClick={() => {
                  setAttributes(() => []);
                  setRarity(() => []);
                  setTerm("");
                  setFilter(charFiltering.resetFilter());
                }}
                fullWidth={isDesktop ? false : true}
                variant="outlined"
                style={{ marginTop: "15px" }}
              >
                Reset Filter
              </Button>
            </Stack>

            <div>
              <Box
                sx={{
                  flexGrow: 1,
                  height: { xs: "400px", md: "auto" },
                  overflowY: "auto",
                }}
                md={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  alignItems: "center",
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
                
                <Stack direction="row">
                  <Button
                    varient="outlined"
                    justifyContent="center"
                    style={{ marginTop: "15px" }}
                  >
                    <MenuIcon />
                  </Button>

                </Stack>

                {/* Conditional content based on clickedUnit */}
                {clickedUnit && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {charFiltering.getEnName(clickedUnit).ENName}
                      <MP3Player char={new Character(clickedUnit)} song={songURL} clickedSong={songName} />
                    </div>
                    <List>
                      
                      {unit.getSongs().map((song) => (
                        <ListItem
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

              </Stack>
            )}
            
            {/* Desktop layout */}
            <Button
              onClick={() => setClickedUnit(null)}
              // fullWidth
              variant="outlined"
              style={{ margin: "15px" }}
            >
              <Stack direction="row" justifyContent="center">
                Back
              </Stack>
            </Button>
            {isDesktop && (
              <Stack direction="row" justifyContent="space-evenly">
                {/* Back button */}

                {/* Conditional content based on clickedUnit */}
                {clickedUnit && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {charFiltering.getEnName(clickedUnit).ENName}
                      {/* <img
                        src={charFiltering.getCharArt(clickedUnit)}
                        alt={clickedUnit}
                        style={{ maxWidth: "100%", height: "auto" }}
                      /> */}
                      <SuspenseImage src={charFiltering.getCharArt(clickedUnit)} alt={clickedUnit} width={"100%"} height={"auto"} />
                    </div>
                    <Stack
                      direction="column"
                      alignItems="stretch"
                      justifyContent="space-evenly"
                      width="20%"
                    >
                      <List>
                        {charFiltering.songURL(clickedUnit).map((song) => (
                          <ListItem>
                            <ListItemButton
                              onClick={() => {
                                setSongURL(unit.makeSongURL(song));
                              }}
                            >
                              {song}
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                      {/* Audio player */}
                      <ThemeProvider theme={theme}>
                        <audio
                          controls
                          src={songURL}
                          type="audio/mpeg"
                          loop
                          style={{ width: "100%" }}
                          auto
                        />
                      </ThemeProvider>
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
