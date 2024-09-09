const Song = require('../models/song');

const serveSongs = (req, res) => {
  const songsList = Song.list();
  res.send(songsList);
}

const serveSong = (req, res) => {
  const { id } = req.params;
  const song = Song.find(Number(id));

  if (!song) return res.status(404).send(`No song with the id ${id}`);
  res.send(song);
};

const createSong = (req, res) => {
  const { title, artist } = req.body;
  const newSong = new Song(title, artist);
  res.send('Song created');
}

module.exports = {
  serveSongs,
  serveSong,
  createSong
};