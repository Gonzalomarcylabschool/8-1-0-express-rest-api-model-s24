const getId = require('../utils/getId');

// the model should be able to do CRUD operations

class Song {
  static #allSongs = [];

  constructor( title , artist){
    this.id = getId();
    this.title = title;
    this.artist = artist;

    Song.#allSongs.push(this);
  }
 
  static list() { 
    return [...Song.#allSongs];
  }

  static find(id) {
    return Song.#allSongs.find(song => song.id === id);
  }
}

module.exports = Song;