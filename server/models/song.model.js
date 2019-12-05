const mongoose = require('mongoose');

var songSchema = new mongoose.Schema({
    header: {
        type: String

    },
    title: {
        type: String,
        required: true

    },
    artist: {
        type: String,
        required: true
    },
    alblum: {
        type: String

    },
    year: {
        type: Number

    },
    comment: {
        type: String,
        maxlength: [500]
    },
    reserve: {
        type: Number
    },
    track: {
        type: Number
    },
    genre: {
        type: Number
    },
    addT: {
        type: String

    },
    addN: {
        type: String

    }
});

mongoose.model('Song', songSchema);