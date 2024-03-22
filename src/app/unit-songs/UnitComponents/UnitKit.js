import Character from '../../../Character.js'
import Stack from '@mui/material/Stack';
import { AccordionDetails, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Paper from '@mui/material/Paper';
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
            <Accordion
            style={{
                width: "100%",
            }}
            >
            <AccordionSummary
                   expandIcon={<ArrowDownwardIcon />}
                   aria-controls="panel1-content"
                   id="panel1-header"
            >
                <Typography>{`Ability ${props.abilitynum}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography
                // style={{
                //     border: "1px solid black",
                //     margin: "10px",
                //     padding: "5px",
                // }}
                >
                    {props.abilitynum <= 3
                    ? unit.UnitKit.ManaBoard.ManaBoard1[`ability${props.abilitynum}`]
                    : unit.UnitKit.ManaBoard.ManaBoard2[`ability${props.abilitynum}`]}
                </Typography>
            </AccordionDetails>
            </Accordion>
            </>

        )
    }

    function Skill(props) {
        return(
            <>
            <Accordion
            style={{
                width: "100%",
                // margin: 'auto'
            }}
            >
            <AccordionSummary
             expandIcon={<ArrowDownwardIcon />}
             aria-controls="panel1-content"
             id="panel1-header"
            >
                <Typography>Skill</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {unit.getKit("skill")}
                </Typography>
            </AccordionDetails>
            </Accordion>
            </>
        )

    }

    function LeaderAbility(props) {
        return(
            <>
            <Accordion
            style={{
                width: "100%",
            }}
            >
            <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"

            >
                <Typography>Leader Ability</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {unit.getKit("leaderBuff")}
                </Typography>
            </AccordionDetails>
            </Accordion>
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
            <Paper
            elevation={8}
            style={{
                width: "70%"
            }}
            >
            <Box
            style={{
                justifyContent: "center",
                alignItems: "center",
                margin: "auto"
            }}
            >
            <LeaderAbility/>
            <Skill/>
            {[1, 2, 3, 4, 5, 6].map((num, index) => (
                <UnitAbility abilitynum={num} key={index}/>
            ))}
            </Box>
            </Paper>
            </Stack>
        </Root>
    )
}

export default UnitKit;