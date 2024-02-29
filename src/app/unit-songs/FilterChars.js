const characters = require("./characters.json");
const Songs = require("./Songs.json");

class FilterChars {
  Chars = characters.chars;
  filtered = [];

  constructor() {
    // console.log(this.Chars);
  }

  setFilterByDevName(DevNicknames) {
    this.filtered = this.Chars.filter((char) => {
      if (DevNicknames && char.DevNicknames === DevNicknames) {
        return true;
      }
      return false;
    });
  }

  setFilterByAttribute(Attribute) {
    //Attribute is an array of attributes.
    console.log("Attribute", Attribute);
    this.filtered = this.Chars.filter((obj) =>
      Attribute.includes(obj.Attribute),
    );
    return this.filtered;
  }

setFilterByRarity(Rarigty) {
    console.log("Rarity", Rarity);
    const filterRarity = this.Chars.filter((obj) => 
            Rarity.map(Number).includes(obj.Rarity),
    );
    console.log(filterRarity);
    return filterRarity;
}

  setFilterByENName(ENName) {
    this.filtered = this.filtered.filter((char) => {
      if (ENName && char.ENName === ENName) {
        return true;
      }
      return false;
    });
  }

  getCharIcon(DevNicknames) {
    return (
      "https://eliya-bot.herokuapp.com/img/assets/chars/" +
      DevNicknames +
      "/square_0.png"
    );
  }

  getCharArt(DevNicknames) {
    return (
      "https://eliya-bot.herokuapp.com/img/assets/chars/" +
      DevNicknames +
      "/full_shot_0.png"
    );
  }

  resetFilter() {
    this.filtered = characters.chars;
    console.log("Filter reset", this.filtered);
    return characters.chars;
  }

  songURL(DevNicknames) {
    const characterList = characters.chars;
    const songs = characterList.filter((char) => {
      if (char.DevNicknames === DevNicknames) {
        return char.songs;
      }
    });

    if (songs.length === 0) {
      console.log("No songs available.");
      return ["no songs :("];
    }

    console.log(songs[0].songs);
    return songs[0].songs;
    // return Chars[DevNicknames].songs;
  }

  getEnName(DevNicknames) {
    return characters.chars.filter((char) => {
      if (char.DevNicknames === DevNicknames) {
        return char;
      }
    });
  }
}

module.exports = FilterChars;
