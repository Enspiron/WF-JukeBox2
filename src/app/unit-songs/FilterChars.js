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

  setFilterByAttribute(Attribute, Chars) {
    // Attribute is an array of attributes.
    console.log("Attribute", Attribute);
    
    // Filter Chars based on whether their 'Attribute' matches any in the 'Attribute' array
    this.filtered = Chars.filter((obj) => Attribute.map(String).includes(obj.Attribute));

    // Log the filtered Chars
    console.log("Chars", this.filtered);

    // Return the filtered Chars
    return this.filtered;
}

  setFilterByRarity(Rarity, Chars) {
    console.log("Rarity", Rarity);
    //rarity is integer
    const filterRarity = Chars.filter((obj) =>
      Rarity.map(Number).includes(obj.Rarity)
    );
    console.log(filterRarity);
    return filterRarity;
  }

  setFilterByENName(ENName) {
    //char.OtherCommonNames is also one of the possible searches
    //OtherCommonNames can be like "a, b, c" so split it and search
    this.filtered = this.filtered.filter((char) => {
      const otherNames = char.OtherCommonNames.split(", ");
      if (ENName && (char.ENName === ENName || otherNames.includes(ENName))) {
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
