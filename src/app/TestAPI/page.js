// 'use client';
// // import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
// import React from 'react';
// import { withCors } from '.././api/middleware/cors';
// // const express = require('express');
// // import express from 'express';
// import NextCors from 'nextjs-cors';

// import {Button } from '@mui/material';
// import axios from 'axios';



// const { createProxyMiddleware } = require('http-proxy-middleware');
// //write a function that returns a response for a GET request to /api/player/save?id={userId}
// //http://localhost:8000/api/player/save?id={userId}

// var xhr = new XMLHttpRequest();



// async function savePlayer(id) {
//     // const [data, setData] = React.useState(null);
    
//     let domain = 'http://localhost'
//     let port = '8000'
//     let url = `${domain}:${port}/api/player/save?id=${id}`

//     let data = '';

//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             data = xhr.responseText;
//             console.log(JSON.parse(data));
//         }
//     }
//     xhr.send();

//     withCors(async (req, res) => {
//         res.send(data);
//     });



//     try {
//         const response = await axios.get(url);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return null;  // or you can throw error or return some other value
//     }

// }

// export default function Home() {
//     const [data, setData] = React.useState(null);

//     const handleClick = () => {
//         savePlayer(1).then((data) => {
//             setData(data);
//     });
    
//         console.log(data);
//     }



//     // 

//     return(
//         <div>
//             <h1>API Testing</h1>
//             <input type="button" onClick={savePlayer} value="Save Player"></input>
//             <Button variant="contained" onClick={handleClick}>Save Player</Button>
//             {(data != null) ? data["user_info"]["name"] : "No data yet."}
//         </div>
//     )
// }
export default function Home() {
    return(
        <div>
            <h1>API Testing</h1>
        </div>
    )
}