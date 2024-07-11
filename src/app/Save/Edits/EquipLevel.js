import React from "react";

function EquipLevel(props) {
    const grey = "https://wfjukebox.b-cdn.net/ribbons/awakening_gray.png";
    const gold = "https://wfjukebox.b-cdn.net/ribbons/awakening_color.png"

    function GoldImage() {
        return(
            <img
            style={{
                width: '20px',
            }}
            src={gold} alt="Gold" />
        )
    }

    function GreyImage() {
        return(
            <img 
            style={{
                width: '20px',
            }}
            src={grey} alt="Grey" />
        )
    }

    //map a value of 4
    function MapLevel(value) {
        const result = [];
        for(let i = 0; i < value; i++) {
            result.push(<GoldImage />);
        }
        for(let i = value; i < 4; i++) {
            result.push(<GreyImage />);
        }
        return result;
    }

    

    return(
        <div>
            {MapLevel(props.level)}
            
        </div>
    )
}

export default EquipLevel;