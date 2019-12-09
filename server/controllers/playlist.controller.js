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


// return all playlist by given user id
module.exports.showplaylist = async(req, res) => {
    var arr = new Array();
    Playlist.aggregate(
        [{ $match: { userN: req.params.id } }]
    ).sort({ "playlistT": -1 }).then((list) => {
        for (var i = 0; i < list.length; i++) { arr.push(list[i].playlistN); }
        console.log(arr);
        return res.status(200).send(arr);
    })

};