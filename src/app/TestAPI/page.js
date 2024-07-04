'use client';
// import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";


function myFunction(app) {
    app.use(
        '/api/player/save?id={userId}',
        createProxyMiddleware({
            target: 'http://localhost:8000',
            changeOrigin: true,
        })
    )




}

import {Button } from '@mui/material';
import axios from 'axios';


const { createProxyMiddleware } = require('http-proxy-middleware');
//write a function that returns a response for a GET request to /api/player/save?id={userId}
//http://localhost:8000/api/player/save?id={userId}




async function savePlayer() {
    let domain = 'http://localhost'
    let port = '8000'
    let url = `${domain}:${port}/api/player/save?id=1`



    axios.get(url).then(response => {
        console.log(response)
        console.log(response.data);

    })

}

export default function Home() {

    // savePlayer();

    return(
        <div>
            <h1>API Testing</h1>
            <input type="button" onClick={savePlayer} value="Save Player"></input>
            <Button variant="contained" onClick={savePlayer}>Save Player</Button>
        </div>
    )
}