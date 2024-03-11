// 'use client';
import React from 'react'
import Comics from './Comics.js'
import Image from 'next/image'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import Layout from './layout.js'
import ComicViewer from './ComicViewer.js'
import {metadata, useClient } from 'next'

// export const metadata = {
//     title: 'Next.js',
//   }

const en_comics = require('./comics_en.json')



export default function Home() {
    // useClient()
    return(
        <Layout>
            <ComicViewer />
        </Layout>
    )
}