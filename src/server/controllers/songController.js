const Song = require('../models/songModel');
const axios = require('axios');
var fs = require('fs');

// get all songs
const getSongs = async (req, res) => {
    const user_id = req.user.id
  
    const songs = await Song.find({user_id}).sort({createdAt: -1})
  
    res.status(200).json(songs)
  }

async function getSongDetails (req, res) {
    console.log("song request received")
    const audioFile = req.file;
    const user_id = req.user.id

    const previous_song = await Song.findOne({user_id}).sort({createdAt: -1})

    var data = {
      'api_token': '04c09479af492a0b8b3c30b4034f697b',
      'file': fs.createReadStream(audioFile.path),
      'return': 'apple_music,spotify',
    };

    const response = await axios({
      method: 'post',
      url: 'https://api.audd.io/',
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log(response.data)

    try {
      const { title, artist, song_link } = response.data.result;
      const { userEmail, location } = req.body;

      if (previous_song.title == title) {
        res.status(200).json(previous_song)

      } else {

      const song = await Song.create({
          title: title,
          artist: artist,
          location: location,
          user: user_id,
          song_link: song_link
      });
      res.status(200).json(song) }
    } catch (error) {
      res.status(400).json({error: error.message})
    }

    // Delete file after use
    fs.unlink(audioFile.path, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })
}

module.exports = { getSongDetails, getSongs };