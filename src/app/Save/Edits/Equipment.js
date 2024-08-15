import React from 'react';
import EquipmentModal from '../Modals/EquipmentModal.js';

const equipment_id = require('../equipment.json');
import EquipLevel from './EquipLevel.js';

function Equipment(props) {

    // "3020006": {
    //     "level": 5,
    //     "enhancement_level": 0,
    //     "protection": false,
    //     "stack": 2
    //   },
    
    const MakeEquipmentList = ()  =>{
        const equips = {};
        //make an array of equipment_id[key][0] : key in json format
        for (let key in equipment_id) {
            equips[equipment_id[key][0]] = key;
        }
        return equips;
    }

    const SearchDevNameByID = (id) => {
        var result;
        for(let key in equipment_id) {
            if (key == id) {
                // console.log("found ", character_id[key][0]);
                result = equipment_id[key][0];
                return result;
            }
        }
    }

    const CheckOwnedEquipment = () => {
        //loop through fileContent["user_character_list"]
        //the key is the character number
        //make a list of MakeCharacterList() key value : character number

        const user_list = props.fileContent["user_equipment_list"];
        const owned_equips = {};
        for (let key in user_list) {
            // console.log("with id you have ", key);
            // console.log("you own ", SearchDevNameByID(key));
            owned_equips[SearchDevNameByID(key)] = key
        }

        return owned_equips;
    }
    
    const EquipmentList = MakeEquipmentList();
    const list = [];
    for (let key in EquipmentList) {
        list.push({devnickname: key, id: EquipmentList[key]});
    }

    const equip_lsit = props.fileContent["user_equipment_list"];
    // console.log(props.setFileContent)
    const fileContent = props.fileContent;

    const setFileContent = props.setFileContent;

    const Equipment = (props) => {
        return(
            <div style={{
                margin: "10px",
                padding: "5px",
                border: "1px solid black",
                borderRadius: "5px",
                width: 'fit-content'
            }}>
                <EquipmentModal devnickname={props.devnickname} ownedequipment={CheckOwnedEquipment()} equips={MakeEquipmentList()} setFileContent={setFileContent} fileContent={fileContent}/>
            </div>
        )
    }

    return(
    <div>
        {list.map((key, index) => (
            
            <div
            style={{
                display: 'inline-block',
            
            }}>
                <Equipment devnickname={key.devnickname} id={key.id}/>
            </div>
        ))}

    </div>)
}

export default Equipment;