import Character from '../../../Character.js'
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

function UnitKit(props) {
    const unit = new Character(props.unit);

    return (
        <div>
            <Stack direction="column" alignItems="center" >
            <Typography 
            style={{
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                marginTop: "10px",
                
            }}
            >{unit.enName}</Typography>
            <img src={unit.getUnitIcon()} 
            style={{
                width: "20%",
                border: "1px solid black",

            }}
            />
            <Divider>
            <Chip label={"Leader Ability"} />
            </Divider>
            <Typography>
            {unit.getKit("leaderBuff")}
            </Typography>
            <Divider>
            <Chip label={"Skill"} />
            </Divider>
            <Typography>
            {unit.getKit("skill")}
            </Typography>
            <Divider />
            {[1, 2, 3, 4, 5, 6].map((num, index) => (
                <>
                <Divider orientation="horizontal">
                <Chip label={`Ability ${num}`} />
                </Divider>
                <Typography>
                    {num <= 3
                    ? unit.UnitKit.ManaBoard.ManaBoard1[`ability${num}`]
                    : unit.UnitKit.ManaBoard.ManaBoard2[`ability${num}`]}
                </Typography>
                </>
            ))}
            
            </Stack>
        </div>
    )
}

export default UnitKit;