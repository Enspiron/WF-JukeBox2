const { get } = require('http');
const exboosts = require('./ex_boost.json');
const exstatus = require('./ex_status.json');

class exBoostConverting {
    constructor() {
        // Constructor code here
        // console.log(this.getEXBoostID("skilldamage_self", 5))

    }

    searchEXBoostByDevName(devName) {
        const slots = exboosts["ex_boosts"];
        for(let slot in slots) {
            for(let boost of slots[slot]) {
                if(boost.devname === devName) {
                    return boost;
                }
            }
        }
        return "not found";
    }

    getEXBoostID(devName, rarity) {
        const boosts = exboosts["ex_boosts"];

        const rarityMapping = {
            5: 0,
            4: 1,
            3: 2,
        }

        const rarityIndex = rarityMapping[rarity];
        if(rarityIndex === undefined) {
            return "not found";
        }

        const exboost = exboosts["ex_boosts"];
        for (let slot in exboost) {
            for (let boost of exboost[slot]) {
                if(boost.devname === devName) {
                    return boost.rarity[rarityIndex] || null;
                }
            }
        }

    }



    buildEXBoost(rarity, slotA, slotB, status) {
        //what complete exboost looks like:
        // "ex_boost": {
        //   "status_id": 3,
        //   "ability_id_list": [10, 35]
        // }

        //check if input is valid
        


        const result = {
            "ex_boost": {
                "status_id": status,
                "ability_id_list": [this.getEXBoostID(slotA, rarity), this.getEXBoostID(slotB, rarity)]
            }
        };

        return result;

    }

    getStatusus() {
        // const status = exstatus[id];
        const statusus = [];
        for(let key in exstatus) {
            // console.log(key);
            const result = {
                "name" : exstatus[key][0],
                "hp" : exstatus[key][1],
                "atk" : exstatus[key][2],
                "rarity" : exstatus[key][3],
                "id" : key[0]
            }

            statusus.push(result);
        }
        // const result = {
        //     "hp" : status[1],
        //     "atk" : status[2],
        //     "rarity" : status[3],
        // }

        const options = [];
        return statusus;
    }

    getRarityByID(id) {
        const exboosts = this.getStatusus();
        for(let status of exboosts) {
            if(status.id === id) {
                return status.rarity;
            }
        }
    }

    buildEXBoostFromForm(form) {
        //form input:
        // const currentBoost = {
        //     "status_id" : 3,
        //     "slot_a": slotA,
        //     "slot_b": slotB,
        //     "slot_a_rarity": slotARarity,
        //     "slot_b_rarity": slotBRarity
        // }

        const result = {
            "ex_boost": {
                "status_id": form.status_id,
                "ability_id_list": [this.getEXBoostID(form.slot_a, form.slot_a_rarity), this.getEXBoostID(form.slot_b, form.slot_b_rarity)]
            }
        };
        return result;
        }
    

    searchEXbyID(id) {
        const boosts = exboosts["ex_boosts"];
        for(let slot in boosts) {
            for (let boost of boosts[slot]) {
                if(boost["rarity"].includes(id)) {
                    return boost;
                }
            }
        }
    }

    decodeEXBoost(exboost) {
        //we assume input is an array like [10, 35]

        const boosts = exboosts["ex_boosts"];

        // console.log(this.searchEXbyID(exboost[0]));
        const result = [];
        for(let id of exboost) {
            result.push(this.searchEXbyID(id));
        }
                


        return result;
    }

    returnRibbon(rarity) {
        const ribbons = {
            5: "https://wfjukebox.b-cdn.net/ribbons/ex_boost_rainbow_border_ribbon.png",
            4: "https://wfjukebox.b-cdn.net/ribbons/ex_boost_silver_border_ribbon.png",
            3: "https://wfjukebox.b-cdn.net/ribbons/ex_boost_bronze_border_ribbon.png"
        }
        return ribbons[rarity];
    }

    returnIcon(rarity) {
        const icons = {
            5: "https://wfjukebox.b-cdn.net/ribbons/ex_boost_gold_icon.png",
            4: "https://wfjukebox.b-cdn.net/ribbons/ex_boost_silver_icon.png",
            3: "https://wfjukebox.b-cdn.net/ribbons/ex_boost_bronze_icon.png"
        }
        return icons[rarity];
    }

}

module.exports = exBoostConverting;