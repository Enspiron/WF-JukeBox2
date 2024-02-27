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

class Character {
    constructor(DevNicknames) {
        this.DevNicknames = DevNicknames;
        this.va = Characters[DevNicknames].va;
        this.attribute = Characters[DevNicknames].Attribute;
        this.jpName = Characters[DevNicknames].JPName;
        this.enName = Characters[DevNicknames].ENName;
        this.role = Characters[DevNicknames].Role;
        this.leaderBuff = Characters[DevNicknames].LeaderBuff;
        this.skill = Characters[DevNicknames].Skill;
        this.skillWait = Characters[DevNicknames].SkillWait;
        this.ability1 = Characters[DevNicknames].Ability1;
        this.ability2 = Characters[DevNicknames].Ability2;
        this.ability3 = Characters[DevNicknames].Ability3;
        this.ability4 = Characters[DevNicknames].Ability4;
        this.ability5 = Characters[DevNicknames].Ability5;
        this.ability6 = Characters[DevNicknames].Ability6;
        this.stance = Characters[DevNicknames].Stance;
    }




}

module.exports = Character;