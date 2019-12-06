const mongoose = require('mongoose');
const Playlist = mongoose.model('Playlist');



// create new song
module.exports.saveplaylist = async(req, res) => {
    var d = new Date();
    var currentTime = d.getTime();
    let playlist = new Playlist({
        userN: req.body.userN,
        playlistN: req.body.playlistN,
        status: req.body.status,
        description: req.body.description,
        playlistT: currentTime
    });

    try {
        const savedplaylist = await playlist.save();
        res.json(savedplaylist);
    } catch (err) {
        res.json({ message: err });
    }
};