"use client"
import React, { useEffect, useState } from 'react';
import Comics from './Comics.js';
import Image from 'next/image';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Banner from './comic_logo.png';
import Modal from '@mui/material/Modal';
import usePagination from './Pagination.js';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import latestNew from './comic_latest_new.png';

import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SettingsIcon from '@mui/icons-material/Settings';

function ComicThumbnail(props) {
    const { episode, isMobile, setEpisode, modal } = props;
    const comic = new Comics('comics-en', episode);
  
    return (
      <Stack
        sx={{
          listStyleType: 'none',
          justifyContent: 'center',
          alignItems: 'center',
          width: isMobile ? '90%' : '100%',
          padding: '5px',
          margin: 'auto',
          boxShadow: '0 0 7px 0 rgba(0, 0, 0, 0.3)',
          borderRadius: '5px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          cursor: 'pointer',
        }}
        onClick={() => {
          setEpisode(episode);
          modal(true);
        }}
      >
        <img src={comic.buildUrl('icon')} style={{ width: '100%' }} />
        <Stack direction='row'>
          {props.new ? (
            <Image src={latestNew} style={{ width: '20%', height: 'auto' }} />
          ) : (
            <></>
          )}
          <Stack>
            <Typography sx={{ fontSize: isMobile ? '0.8rem' : '1rem' }}
            style={{
                textAlign: 'center',
            }}
            >
              Chapter {comic.episode}
            </Typography>
            <Typography sx={{ fontSize: isMobile ? '0.5rem' : '1rem' }}>
              {comic.title}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    );
  }

export default function ComicViewer() {
    const en_comics = require('./comics_en.json');

    const [episode, setEpisode] = useState(1);
    const Comic = new Comics('comics-en', episode);
    Comic.setEpisode(episode);
  
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [dialog, setDialog] = useState(false);
    const handleDialog = () => setDialog(true);
    const closeDialog = () => setDialog(false);
  
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth < 800);
    }, []);
  
    const [page, setPage] = useState(1);
    const PER_PAGE = isMobile ? 9 : 8;
  
    const count = Math.ceil(en_comics.length / PER_PAGE);
  
    const _DATA = usePagination(en_comics, PER_PAGE);

    const ComicModal = (props) => {
        const ComicNav = () => {
            return(
                <Stack
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    margin: 'auto',
                }}
                >
                    <Button
                    variant="contained"
                    sx={{
                        margin: 'auto',
                    }}
                    onClick={() => {
                        if(episode > 1) {
                            setEpisode(episode - 1)
                            Comic.setEpisode(episode - 1)
                        }
                    }}
                    >
                        <ArrowBackIcon />
                    </Button>
                    <Typography>
                        Chapter {episode}
                    </Typography>

                    <Button
                    variant="contained" 
                    sx={{
                        margin: 'auto',
                    }}
                    onClick={() => {
                        if(episode < en_comics.length) {
                            setEpisode(episode + 1)
                            Comic.setEpisode(episode + 1)
                        }
                    }}                   
                    >
                        <ArrowForwardIcon />
                    </Button>
                    
                </Stack>
            )
        }

        return(
            <Modal
            open={open}
            onClose={handleClose}
      

            >
                <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    justifyContent: 'center',
                    width: isMobile ? '95%' : '50%',
                    height: isMobile ? '85%' : '95%',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    overflow: 'auto',
                    '&:hover': {
                        backgroundColor: '#fff',
                    },
                    padding: '15px',
                    // margin: isMobile ? 'auto' : '10px',
                }}
                >
                    <ComicNav />
                    <img
  
                    src={Comic.buildUrl('base')} onClick={props.open}
                    style={{
                        // position: 'absolute',
                        // left: '50%',
                        width: '100%',
                        marginTop: '10px'
                    }}
                    
                    />
                    <ComicNav />
                </Box>
            </Modal>
        )
    }

    const DesktopGrid = (props) => {
        return(
            <Grid container spacing={6} columns={0}
            rowSpacing={3}
            columnSpacing={5}
            style={{
                width: 'fit-content',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 'auto',
            }}
            >
                {_DATA.currentData().map((comic, index) => (
                    <Grid item  lg={2.5} xs={{

                    }} style={{
                        boxSizing: 'border-box',
                        // backgroundColor: 'rgba(0,0,0,0.1)',
                        // border: '1px solid rgba(0,0,0,0.6)',
                    }}>

                        <ComicThumbnail episode={comic.episode} setEpisode={setEpisode} modal={setOpen} open={handleOpen} isMobile={props.isMobile}

                        />
                    </Grid>
                ))}
            </Grid>
        )
    }

    const MobileGrid = (props) => {
        return(
            <Grid container 
            rowSpacing={1}
            columnSpacing={0}
            // columnSpacing={0}
            style={{
                width: 'fit-content',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 'auto',
            }}
            >
                {_DATA.currentData().map((comic, index) => (
                    <Grid item  xs={4} style={{
                        boxSizing: 'border-box',
                        // backgroundColor: 'rgba(0,0,0,0.1)',
                        // border: '1px solid rgba(0,0,0,0.6)',
                    }}>

                        <ComicThumbnail episode={comic.episode} setEpisode={setEpisode} modal={setOpen} open={handleOpen} isMobile={props.isMobile}

                        />
                    </Grid>
                ))}
            </Grid>
        )
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    const LatestComic = () => {
        return(
            <Box>
                <ComicThumbnail episode={en_comics.length} setEpisode={setEpisode} modal={setOpen} open={handleOpen} isMobile={isMobile} new={true}/>
            </Box>
        )
    }

    const languages = ['English', 'Japanese', 'Korean'];

    return (
        <Box
        sx={{
            backgroundImage: "url('https://worldflipper.jp/assets/images/kyoushujo//common/bg.png')"

        }}
        >
      <IconButton aria-label="Example"
      style={{
            "margin": "auto",
            "position": "absolute",
            left: '49%',
      }}
      >
        <SettingsIcon onClick={handleDialog}/>
      </IconButton>
      <Dialog
        open={dialog}
        onClose={closeDialog}
        style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '10px',

        }}
      >
        <Box
        style={{
            padding: '10px',
        }}
        >
            {/* dropdown of language options */}
            <select>
                {languages.map((lang) => (
                    <option value={lang}>{lang}</option>
                ))}
            </select>

        
        </Box>
      </Dialog>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    paddingTop: '10px',
                    paddingBottom: '100px',
                    
                }}
            >
            {isMobile ? <Image src={Banner} 
            style={{
                width: '90%',
                height: 'auto',
                margin: 'auto',
                // backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
            /> : <></>}
            {/* {isMobile ? <LatestComic/> : <></>} */}

            {isMobile ? <MobileGrid isMobile={isMobile}/> : <DesktopGrid isMobile={isMobile}/>}
            {/* <DesktopGrid /> */}
            <Pagination
            count={count}
            page={page}
            onChange={(e, value) => {
                setPage(value);
                _DATA.jump(value);
            }}
            variant="outlined"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto',
                marginTop: '20px',
                marginBottom: '20px',
                padding: '5px',
            }}
            />
            </Box>
            <div>
                <ComicModal episode={episode}
                setEpisode={setEpisode}
                />
            {/* {comicVisible ? <ComicPopover episode={episode} /> : <></>} */}
            </div>
        </Box>
    );
}