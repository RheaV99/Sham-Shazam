const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Defining song schema for database
const songSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    user: {
        type: String,
        required: true
      },
    song_link: {
          type: String,
          required: false
      }
}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema);