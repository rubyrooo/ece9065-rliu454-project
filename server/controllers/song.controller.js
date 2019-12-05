const mongoose = require('mongoose');
const Song = mongoose.model('Song');



// create new song
module.exports.savesong = async(req, res) => {
    let song = new Song({
        header: req.body.header,
        title: req.body.title,
        artist: req.body.artist,
        alblum: req.body.alblum,
        year: req.body.year,
        comment: req.body.comment,
        reserve: req.body.reserve,
        track: req.body.track,
        genre: req.body.genre,
        addT: req.body.addT,
        addN: req.body.addN
    });

    try {
        const savedsong = await song.save();
        res.json(savedsong.title);
    } catch (err) {
        res.json({ message: err });
    }
};