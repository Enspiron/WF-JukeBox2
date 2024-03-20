import * as React from 'react';

import EventSongs from './EventSongs.js';

export const metadata = {
    title: 'Event Music | WFJukebox',
    description: 'The place to find event, boss, and story music from World Flipper',
    openGraph: {
        title: 'Event Music | WFJukebox',
        description: 'The place to find event, boss, and story music from World Flipper',
        type: 'website',
        url: 'https://wfjukebox.vercel.app/event-songs',
        image: 'https://cdn.discordapp.com/attachments/489238630062227476/1219875051575447603/normal_background.png?ex=660ce42c&is=65fa6f2c&hm=e2b37f5836ac4ae8bd8c6b837fb0567e8a4aa6ff626e6fa3e693e62a3938c0c6&',
    }
}

export default function Home() {


    return (
        <React.Fragment>
            <EventSongs/>
        </React.Fragment>
    );


}

