import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';


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

    //for home audio
    function playHomeFile(file) {
        console.log(file)
        const audioSource = `https://wfjukebox.b-cdn.net/wfjukebox/character/character_art/${props.unit}/voice/home/${file}`;

        const audio = new Audio(audioSource);
        audio.play();
        

    };

    //this is for regular voice files
    function playSound (file) {
        const audioSource = `https://wfjukebox.b-cdn.net/wfjukebox/character/character_art/${props.unit}/${file}`;
        console.log(audioSource);
        
        const audio = new Audio(audioSource);
        audio.play();
    };

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
                    onClick={()=>{playHomeFile(voice)}}
                    style={{
                        overflow: 'hidden'
                    }}
                >
                    {voice.replace('.mp3', '')}
                </Button>
            ))}
            </div>
        </div>
    )
}

export default Soundboard;