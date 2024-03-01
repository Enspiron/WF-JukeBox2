"use client";
import React from 'react';
import Button from '@mui/material/Button';
import { useEffect } from 'react';

let location = "";

const SitesNotReady = {
    "comics" : {
        "ready" : false,
        "url" : "https://wfjukebox.com/#comics"
    },
    "event-songs" : {
        "ready" : false,
        "url" : "https://wfjukebox.com/#event-ost"
    },
}

function GetSiteLocation() {
    const urlPath = window.location.pathname;
    const parts = urlPath.split('/');
    return parts[1];
}

function CheckLocation() {
    const site = GetSiteLocation();
    if(SitesNotReady[site]) {
        return SitesNotReady[site];
    }
    return false;
}

export default function NotFound() {


    return (
        <main
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
                <h1>404 - Page Not Found</h1>
                <p
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                        The page <strong>{GetSiteLocation()}</strong> could not be found or is in the works
                </p>

                {
                    CheckLocation() ? 
                    <Button variant="contained" href={SitesNotReady[GetSiteLocation()].url}>
                        Go to {GetSiteLocation()}
                    </Button>
                    :
                    <Button variant="contained" href="https://wfjukebox.com">
                        Go to Main Site
                    </Button>
                }

        </main>
    );
}