// Character example:
// {
//     "Character": "",
//     "va": "Shunsuke Takeuchi",
//     "Attribute": "Fire",
//     "JPName": "\u30f4\u30a1\u30fc\u30b0\u30ca\u30fc",
//     "ENName": "[The Hell-Fire Dragon King]\nWagner",
//     "Role": "Bow",
//     "LeaderBuff": "[Fire Dragon Style]\nFire characters' ATK +100% / Power flip damage +70%",
//     "Skill": "[Prominence Breath]\nWith a breath of blazing fire, deal fire damage (27x) to enemies in front ",
//     "SkillWait": "550",
//     "Ability1": "Power flip damage +30%",
//     "Ability2": "Every 5 power flips, own ATK +15% [MAX: +90%]",
//     "Ability3": "[Main] Combo count needed for Lv3 power flip -5 & power flip damage +40%",
//     "Ability4": "When battle begins, own skill gauge +50%",
//     "Ability5": "Combo count needed for Lv3 power flip -2 & Lv3 power flip damage +5%",
//     "Ability6": "Every Lv3 power flips, power flip damage +8% [MAX: +40%]",
//     "Stance": "Attacker",
//     "Race": "Dragon",
//     "Gender": "Male",
//     "DevNicknames": "fire_dragon",
//     "Notes": "The \"Dev Nicknames\" are the internal character names that are used on the official World Flipper site and within the game programming itself. ",
//     "OtherCommonNames": "Vagner",
//     "Obtain": "",
//     "Choice": "",
//     "SubName": "\u7344\u708e\u306e\u9f8d\u738b",
//     "FeverGain": "3",
//     "HitCount": "30",
//     "Rarity": 5,
//     "MaxHP": 4233,
//     "MaxATK": 888,
//     "SkillIcon": "atk_front",
//     "SkillRange": [
//         "1",
//         "1",
//         "300",
//         "2000",
//         "0",
//         "0",
//         "0",
//         "0"
//     ],
//     "InTaiwan": true,
//     "Gauges": {
//         "Ability4": {
//             "Target": "own",
//             "Condition": "",
//             "Every": 0,
//             "EveryCond": "",
//             "IsMain": false,
//             "Amount": "50"
//         }
//     },
//     "ManaBoard2": true,
//     "MaxGauges": {},
//     "songs": [
//         "wagner_2.mp3"
//     ]
// }

const Characters = require('./characters.json');

export default class Character{
    UnitKit = {
        ManaBoard : {
            ManaBoard1: {
            "ability1": "",
            "ability2": "",
            "ability3": "",
            },
            ManaBoard2: {
            "ability4": "",
            "ability5": "",
            "ability6": "",
            }
        },
        "attribute": "",
        "leaderBuff": "",
        "role": "",
        "skill": ""
    }

    attribute = "";
    

    constructor(DevNicknames) {
        console.log("Working")
        Characters.chars.filter((char) => {
            if (char.DevNicknames === DevNicknames) {
                this.Unit = char;
            }
        })

        if (this.Unit) {
            this.enName = this.Unit.ENName;
            this.attribute = this.Unit.Attribute;
            this.DevNicknames = DevNicknames;

            this.UnitKit.ManaBoard.ManaBoard1.ability1 = this.Unit.Ability1;
            this.UnitKit.ManaBoard.ManaBoard1.ability2 = this.Unit.Ability2;
            this.UnitKit.ManaBoard.ManaBoard1.ability3 = this.Unit.Ability3;
            this.UnitKit.ManaBoard.ManaBoard2.ability4 = this.Unit.Ability4;
            this.UnitKit.ManaBoard.ManaBoard2.ability5 = this.Unit.Ability5;
            this.UnitKit.ManaBoard.ManaBoard2.ability6 = this.Unit.Ability6;

            this.UnitKit.attribute = this.Unit.Attribute;
            this.UnitKit.leaderBuff = this.Unit.LeaderBuff;
            this.UnitKit.role = this.Unit.Role;
            this.UnitKit.skill = this.Unit.Skill;
        } else {
            console.log("Character not found: ", DevNicknames)
        }

        console.log("Initialized Character: ", this.enName, " with attribute: ", this.attribute)
    }

    changeUnit(DevNicknames) {
        Characters.chars.filter((char) => {
            if (char.DevNicknames === DevNicknames) {
                this.Unit = char;
            }
        })

        if (this.Unit) {
            this.enName = this.Unit.ENName;
            this.attribute = this.Unit.Attribute;

            this.UnitKit.ManaBoard.ManaBoard1.ability1 = this.Unit.Ability1;
            this.UnitKit.ManaBoard.ManaBoard1.ability2 = this.Unit.Ability2;
            this.UnitKit.ManaBoard.ManaBoard1.ability3 = this.Unit.Ability3;
            this.UnitKit.ManaBoard.ManaBoard2.ability4 = this.Unit.Ability4;
            this.UnitKit.ManaBoard.ManaBoard2.ability5 = this.Unit.Ability5;
            this.UnitKit.ManaBoard.ManaBoard2.ability6 = this.Unit.Ability6;

            this.UnitKit.attribute = this.Unit.Attribute;
            this.UnitKit.leaderBuff = this.Unit.LeaderBuff;
            this.UnitKit.role = this.Unit.Role;
            this.UnitKit.skill = this.Unit.Skill;
        } else {
            console.log("Character not found: ", DevNicknames)
        }

        console.log("Changed Character: ", this.enName, " with attribute: ", this.attribute)

    }
     
    makeSongURL(song) {
        return `https://github.com/Enspiron/WorldFlipperPlayer/raw/main/character_unique/${this.Unit.DevNicknames}/${song}`
    }

    hasSong() {
        if (this.Unit.songs) {
            return true;
        } else {
            return false;
        }
    }

    getSongs() {  
        if (this.Unit.songs) {
            return this.Unit.songs;
        } else {
            return ["No Songs :("];
        }
    }

    getUnitIcon() {
        return `https://eliya-bot.herokuapp.com/img/assets/chars/${this.Unit.DevNicknames}/square_0.png`
    }
    

}

