const mongoose = require('mongoose');

var playlistSchema = new mongoose.Schema({
    userN: {
        type: String

    },
    playlistN: {
        type: String,
        required: true

    },
    status: {
        type: String

    },
    description: {
        type: String

    },
    playlistT: {
        type: Date
    },
    songlist: {

        type: Array

    }
});

mongoose.model('Playlist', playlistSchema);