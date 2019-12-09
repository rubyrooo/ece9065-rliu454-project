const mongoose = require('mongoose');
const Song = mongoose.model('Song');
const Review = mongoose.model('Review');



// create new song
module.exports.savesong = async(req, res) => {
    var d = new Date();
    var currentTime = d.getTime();
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
        addT: currentTime,
        addN: req.body.addN
    });

    try {
        const savedsong = await song.save();
        res.json(savedsong.title);
    } catch (err) {
        res.json({ message: err });
    }
};


// soft search song
module.exports.searchsong = (req, res) => {
    var word = req.params.id;
    console.log(word);
    var _filter = {
        $or: [

            { title: { $regex: word, $options: '$i' } },
            { artist: { $regex: word, $options: '$i' } },
            { alblum: { $regex: word, $options: '$i' } },
            { year: { $regex: word, $options: '$i' } },
            { comment: { $regex: word, $options: '$i' } },
            { reserve: { $regex: word, $options: '$i' } },
            { track: { $regex: word, $options: '$i' } },
            { genre: { $regex: word, $options: '$i' } }
        ]
    }

    Song.find(_filter, (err, song) => {

        if (!song) {
            console.log("11");
            return res.status(404).json({ status: false, message: 'No search result found.' });
        } else {
            console.log(song);
            return res.status(200).send(song);
        }
    })
};


/* // top 10 song
module.exports.topsong = (req, res) => {
    Review.find().sort({ "rating": -1 }).limit(10).then((song) => {
        return res.status(200).send(song);
    })
}; */

// top 10 song
module.exports.topsong = (req, res) => {
    var arr = new Array();
    Review.aggregate([
        { "$group": { _id: "$songN", count: { $sum: 1 } } }
    ]).sort({ "count": -1 }).limit(10).then((list) => {
        for (var i = 0; i < list.length; i++) { arr.push(list[i]._id); } // get _id from { "_id": "song5", "count": 4 }
        console.log(arr);
        return res.status(200).send(arr);
    })

}

// return song given by song name
module.exports.showsong = async(req, res) => {
    var arr = new Array();
    Song.aggregate(
        [{ $match: { title: req.params.id } }]
    ).sort({ "addT": -1 }).then((list) => {
        for (var i = 0; i < list.length; i++) { arr.push(list[i]); }
        console.log(arr);
        return res.status(200).send(arr);
    })

};