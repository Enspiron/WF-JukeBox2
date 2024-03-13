"use client"
import React from 'react'
import Comics from './Comics.js'
import Image from 'next/image'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Banner from './comic_logo.png'
import Modal from '@mui/material/Modal';
import usePagination from "./Pagination.js";
import Pagination from '@mui/material/Pagination';
import Zoom from '@mui/material/Zoom';
import { Desk } from '@mui/icons-material'


function ComicThumbnail(props) {
    const episode = props.episode
    const comic = new Comics("comics-en", episode)



    return(
        <Stack
        sx={{
            // display: 'list-item',
            listStyleType: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            // flexDirection: 'column',
            width: props.isMobile ? '90%' : '100%',
            // scale: '0.5',
            // border: '1px solid black',
            padding: '5px',
            margin: 'auto',
            boxShadow: '0 0 7px 0 rgba(0, 0, 0, 0.3)',
            borderRadius: '5px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            cursor: 'pointer',
        }}
        onClick={
            () => {props.setEpisode(props.episode); props.modal(true)}
        }
        >
            <img src={comic.buildUrl('icon')} 
            style={{
                width: '100%',
            }}
            />
            <Typography
            sx={{
                fontSize: props.isMobile ? '0.8rem' : '1rem',
            }}
            >Chapter {comic.episode}
            </Typography>
            <Typography
            sx={{
                fontSize: props.isMobile ? '0.5rem' : '1rem',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            >{comic.title}</Typography>
        </Stack>
    )
}

export default function ComicViewer() {
    const en_comics = require('./comics_en.json')

    const [episode, setEpisode] = React.useState(1)
    const Comic = new Comics("comics-en", episode);
    Comic.setEpisode(episode)

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    let isMobile = false;
    // const isMobile = window.innerWidth < 800
    if(typeof window !== 'undefined') {
        if(window.innerWidth < 800) {
            isMobile = true
        }
    }


    const [page, setPage] = React.useState(1)
    const PER_PAGE = isMobile ? 9 : 8;

    const count = Math.ceil(en_comics.length / PER_PAGE);
    const _DATA = usePagination(en_comics, PER_PAGE);

    const ComicModal = (props) => {
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
                    <img src={Comic.buildUrl('base')} onClick={props.open}
                    style={{
                        // position: 'absolute',
                        // left: '50%',
                        width: '100%',
                    }}
                    
                    />
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
                        <Zoom style={{ transitionDelay: false ? '500ms' : '0ms' }}>

                        <ComicThumbnail episode={comic.episode} setEpisode={setEpisode} modal={setOpen} open={handleOpen} isMobile={props.isMobile}

                        />
                        </Zoom>
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
                        <Zoom style={{ transitionDelay: false ? '500ms' : '0ms' }}>

                        <ComicThumbnail episode={comic.episode} setEpisode={setEpisode} modal={setOpen} open={handleOpen} isMobile={props.isMobile}

                        />
                        </Zoom>
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


    return (
        <Box
        sx={{
            backgroundImage: "url('https://worldflipper.jp/assets/images/kyoushujo//common/bg.png')"

        }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    paddingTop: '50px',
                    paddingBottom: '100px',
                    
                }}
            >
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
                <ComicModal episode={
                    episode
                }/>
            {/* {comicVisible ? <ComicPopover episode={episode} /> : <></>} */}
            </div>
        </Box>
    );
}