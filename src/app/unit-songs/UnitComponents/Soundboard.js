"use client"
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
const Speech = require('./character_speech.json');
import React from 'react';
const Characters = require('./character.json');


function ConvertDevNameToID(DevName) { 
    // const char = Characters.chars.find((char) => char.DevNicknames === DevName);
    // return char.ID;
    console.log("Checking for id of ", DevName);
    for(const key in Characters) {
        if(Characters[key][0] === DevName) {
            return key;
        }
    }

}

function Soundboard(props) {
    const homeVoices = require('./Songs.json');

    const voices = [
        { type: 'PowerFlip1', file: 'voice/battle/power_flip_0.mp3'  },
        { type: 'PowerFlip2', file: 'voice/battle/power_flip_1.mp3'  },
        { type: 'Evolve', file: 'voice/ally/evolution.mp3'  },
        { type: 'Victory1', file: 'voice/battle/win_0.mp3'  },
        { type: 'Victory2', file: 'voice/battle/win_1.mp3'  },
        { type: 'Skill Charged', file: 'voice/battle/skill_ready.mp3'  },
        { type: 'Recute', file: 'voice/ally/join.mp3'  },
        { type: 'Skill1', file: 'voice/battle/skill_0.mp3' },
        { type: 'Skill2', file: 'voice/battle/skill_1.mp3' },
        { type: 'BattleStart1', file: 'voice/battle/battle_start_0.mp3' },
        { type: 'BattleStart2', file: 'voice/battle/battle_start_1.mp3' },
        { type: 'Skill Charged', file: 'voice/battle/skill_ready.mp3' },
        { type: 'Pitfall1', file: 'voice/battle/outhole_0.mp3' },
        { type: 'Pitfall2', file: 'voice/battle/outhole_1.mp3' },
    ]

    const audioSource = 'https://wfjukebox.b-cdn.net/wfjukebox/character/character_art/'+ props.unit + '/voice/home/'

    const [selectedAudio, setSelectedAudio] = React.useState('Nothing Clicked')
    const [selectedFile , setSelectedFile] = React.useState('Nothing Clicked')

    //for home audio
    function playHomeFile(file) {
        console.log(file)
        const audioSource = `https://wfjukebox.b-cdn.net/wfjukebox/character/character_art/${props.unit}/voice/home/${file}`;
        const source = audioSource.split('https://wfjukebox.b-cdn.net/wfjukebox/character/character_art/')[1];
        //remove whats before /home/
        const source2 = source.split('/home/')[1];
        const filePath = source;

        // Split the path into an array by "/"
        const parts = filePath.split("/");

        // Extract the last two elements (the folder and file name) and join them
        const result = parts.slice(-2, -1) + '/' + parts.slice(-1);        
        const audio = new Audio(audioSource);

        //remove .mp3 from result
        const result2 = result.replace('.mp3', '');
        setSelectedAudio(result2);
        audio.play();
        

    };

    function ChangeHome(file) {
        console.log(file)
        const audioSource = `https://wfjukebox.b-cdn.net/wfjukebox/character/character_art/${props.unit}/voice/home/${file}`;
        const source = audioSource.split('https://wfjukebox.b-cdn.net/wfjukebox/character/character_art/')[1];
        //remove whats before /home/
        const source2 = source.split('/home/')[1];
        const filePath = source;

        // Split the path into an array by "/"
        const parts = filePath.split("/");

        // Extract the last two elements (the folder and file name) and join them
        const result = parts.slice(-2, -1) + '/' + parts.slice(-1);        
        const audio = new Audio(audioSource);

        //remove .mp3 from result
        const result2 = result.replace('.mp3', '');
        setSelectedAudio(result2);
    }

    //this is for regular voice files
    function playSound (file) {
        const audioSource = `https://wfjukebox.b-cdn.net/wfjukebox/character/character_art/${props.unit}/${file}`;
        console.log(audioSource, file);

        // remove the start of url
        const source = audioSource.split('https://wfjukebox.b-cdn.net/wfjukebox/character/character_art/')[1];
        //remove whats before /home/
        const source2 = source.split('/home/')[1];
        const filePath = source;

        // Split the path into an array by "/"
        const parts = filePath.split("/");

        // Extract the last two elements (the folder and file name) and join them
        const result = parts.slice(-2, -1) + '/' + parts.slice(-1);

        // setSelectedAudio(filePath);
        
        const audio = new Audio(audioSource);
        audio.play();
    };

    const charVoices = Speech[ConvertDevNameToID(props.unit)];
    console.log("Voices found: ", charVoices);

    //create object of voice
    //{speech: 'speech', file: 'file'}
    function SearchVoiceFromClicked() {
        //charVoices[4] is the file
        //charVoices[3] is the speech
        //use selectedAudio to get the file
        //return the speech based on the selectedAudio
        //find the matching voice file 
        try{

            const voice = charVoices.find((voice) => voice[4] === selectedAudio);
            console.log("Voice found: ", voice[3]);
            return voice[3];
        } catch {
            return 'No Speech Found for English';
        }
    }
    if(selectedAudio !== 'Nothing Clicked') {

        
        SearchVoiceFromClicked();
    }


    return(
        <div style={{height: 'fit-content'}}>
            <Divider orientation="horizontal"  >Gameplay Audio</Divider> 
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', margin: '5px'}}>
            {voices.map((voice, index) => (
                <Button
                    variant="contained"
                    key={index}
                    onClick={()=>{playSound(voice.file)}}
                >
                    {voice.type}
                </Button>
            ))}
            </div>

            <Divider orientation="horizontal"  >Home Audio</Divider>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', margin: '5px'}}>
            {homeVoices[props.unit].map((voice, index) => (
                <Button
                    variant="contained"
                    key={index}
                    onClick={()=>{setSelectedFile(voice);
                    ChangeHome(voice)
                    }}
                    style={{
                        overflow: 'hidden'
                    }}
                >
                    {voice.replace('.mp3', '')}
                </Button>
            ))}
            </div>
            <Divider orientation="horizontal"  >Character Speech</Divider>
            <div>
                {selectedAudio}
                <div
                style={{
                    border: '1px solid black',
                    padding: '5px',
                    margin: '5px',
                    width: 'fit-content'

                }}
                >
                    {selectedFile !== 'Nothing Clicked' ? SearchVoiceFromClicked() : 'No Speech Selected'}
                    <Button
                    //search for the speech based on the selectedFile
                    onClick={()=>{playHomeFile(selectedFile)}}
                    >
                        Play Audio
                    </Button>
                    
                </div>
            </div>
        </div>
    )
}

export default Soundboard;