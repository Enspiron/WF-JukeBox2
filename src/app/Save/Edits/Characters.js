import React from 'react';
const character_id = require('../character.json');

import UnitEditModal from '../Modals/UnitEditModal.js';




function Characters(props) {
    const list = [];
    const fileContent = props.userlist;



    const SearchDevNameByID = (id) => {
        var result;
        for(let key in character_id) {
            if (key == id) {
                // console.log("found ", character_id[key][0]);
                result = character_id[key][0];
                return result;
            }
        }
    }

    const CheckOwnedCharacters = () => {
        //loop through fileContent["user_character_list"]
        //the key is the character number
        //make a list of MakeCharacterList() key value : character number
    
        const user_list = fileContent["user_character_list"];
        const owned_chars = {};
        for (let key in user_list) {
            // console.log("with id you have ", key);
            // console.log("you own ", SearchDevNameByID(key));
            owned_chars[SearchDevNameByID(key)] = key;
        }
    
        return owned_chars;
    
    }

    const MakeCharacterList = () => {
        const chars = {};
        //make an array of character_id[key][0] : key in json format
        for (let key in character_id) {
            chars[character_id[key][0]] = key;
        }
        return chars;
    }

    const CharacterList = MakeCharacterList();

    for (let key in CharacterList) {
        list.push({devnickname: key, id: CharacterList[key]});
    }

    // console.log("character list: ", list)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };



    const Unit = (props) => {
        return(
            <div style={{
                margin: "10px",
                padding: "5px",
                border: "1px solid black",
                borderRadius: "5px",
                width: 'fit-content'
            }}>
                {/* {props.devnickname} */}

                <UnitEditModal devnickname={props.devnickname} ownedunits={CheckOwnedCharacters()}/>

            </div>
        )
    }

    

    return (
        <div>
            {list.map((key, index) => (
                <div
                style={{
                    display: 'inline-block',
                
                }}>
                    <Unit devnickname={key.devnickname} id={key.id} list={props.userlist}/>
                </div>
            ))}
        </div>
    );
}

export default Characters;