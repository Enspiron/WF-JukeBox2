import React from "react";
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';


function EquipLevel(props) {
    const grey = "https://wfjukebox.b-cdn.net/ribbons/awakening_gray.png";
    const gold = "https://wfjukebox.b-cdn.net/ribbons/awakening_color.png"

    const [edit, setEdit] = React.useState(false);

    function GoldImage(props) {
        return(
            <img
            style={{
                width: '20px',
                marginRight: '2px',

            }}
            src={gold} alt="Gold" 
            // onMouseEnter={handlemouseEnter}
            />
        )
    }

    function GreyImage(props) {
        return(
            <img 
            style={{
                width: '20px',
                marginRight: '2px',
            }}
            src={grey} alt="Grey" 
            // onMouseEnter={handlemouseEnter}
            />
        )
    }
   

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Rating
                name="Equip"
                defaultValue={props.level}
                max={4}
                precision={1}
                icon={<GoldImage />}
                emptyIcon={<GreyImage />}
                readOnly={edit}
                style={{
                    // if edit is false then background grey with border otherwise no background
                    backgroundColor: edit ? "white" : "#f5f5f5",
                    borderRadius: "10px",
                    filter: edit ? "brightness(90%)" : "brightness(100%)",
                    padding: "10px",
                }}
            />
            <Button
                onClick={() => setEdit(!edit)}
                variant="outlined"
                style={{
                    height: '30px',
                }}
                textTransform="none"
            >
                {edit ? "Edit" : "Save"}
            </Button>
        </div>
    )
    
}

export default EquipLevel;