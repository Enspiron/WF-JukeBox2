// 'use client';
import React from 'react'
import Comics from './Comics.js'
import Image from 'next/image'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import Layout from './layout.js'
import ComicViewer from './ComicViewer.js'
import { useClient } from 'next'

// export const metadata = {
//     title: 'Next.js',
//   }

const en_comics = require('./comics_en.json')

export const metadata = {
  title: "Comics",
  description: "Comics",
}

export default function Home() {
    // useClient()
    const url = 'https://raw.githubusercontent.com/Enspiron/Data/main/comics/comics_en.json';
    var json;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // console.log(data); // Here you can work with the fetched JSON data
        json = data[0];
        // alert('Data loaded successfully!');
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    
    // getJSON();

    return(
        <Layout>
            <ComicViewer />
        </Layout>
    )
}