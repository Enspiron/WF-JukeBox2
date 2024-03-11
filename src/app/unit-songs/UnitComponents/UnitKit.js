import Character from '../../../Character.js'
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

function UnitKit(props) {
    const Root = styled('div')(({ theme }) => ({
        // width: '100%',
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
        '& > :not(style) ~ :not(style)': {
          marginTop: theme.spacing(2),
        },
      }));

    const unit = new Character(props.unit);
    const content = (
        <p>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}</p>
      );

    const UnitAbility = (props) => {
        return(
            <>
                <Divider orientation="horizontal">
                <Chip label={`Ability ${props.abilitynum}`} size="small"/>
                </Divider>
                <Typography
                style={{
                    border: "1px solid black",
                    margin: "10px",
                    padding: "5px",
                }}
                >
                    {props.abilitynum <= 3
                    ? unit.UnitKit.ManaBoard.ManaBoard1[`ability${props.abilitynum}`]
                    : unit.UnitKit.ManaBoard.ManaBoard2[`ability${props.abilitynum}`]}
                </Typography>
            </>

        )
    }

    function Skill(props) {
        return(
            <>
                <Divider orientation="horizontal">
                <Chip label="Skill" size="small"/>
                </Divider>
                <Typography
                style={{
                    border: "1px solid black",
                    margin: "10px",
                    padding: "5px",
                }}
                >
                    {unit.getKit("skill")}
                </Typography>
            </>
        )

    }

    function LeaderAbility(props) {
        return(
            <>
                <Divider orientation="horizontal">
                    <Chip label="Leader Ability" size="small"/>
                </Divider>
                <Typography
                style={{
                    border: "1px solid black",
                    margin: "10px",
                    padding: "5px",
                    // width: "fit-content",
                    textWrap: "wrap",
                }}
                >
                    {unit.getKit("leaderBuff")}
                </Typography>
            </>
        )
    }
    
    

    return (
        <Root>
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
                width: "50px",
                border: "1px solid black",
                margin: "10px",

            }}
            />
            <LeaderAbility/>
            <Typography>
            <Skill/>
            </Typography>
            <Divider />
            {[1, 2, 3, 4, 5, 6].map((num, index) => (
                <UnitAbility abilitynum={num} key={index}/>
            ))}
            
            </Stack>
        </Root>
    )
}

export default UnitKit;