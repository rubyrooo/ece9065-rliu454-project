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
        type: String

    },
    comment: {
        type: String,
        maxlength: [500]
    },
    reserve: {
        type: String
    },
    track: {
        type: String
    },
    genre: {
        type: String
    },
    addT: {
        type: Date

    },
    addN: {
        type: String

    },
    hidden: {
        type: Boolean,
        required: true,
        default: false
    },
});

mongoose.model('Song', songSchema);