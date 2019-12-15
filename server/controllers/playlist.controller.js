const mongoose = require('mongoose');
const Playlist = mongoose.model('Playlist');
newsongList = new Array;



// create new saveplaylist, one user can not have same name playlist
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

    songList = new Array();

    Playlist.aggregate(
        [{ $match: { userN: req.params.id } }]
    ).sort({ "playlistT": -1 }).then((list) => {

        console.log("HERE!!!!");
        console.log(list);
        return res.status(200).send(list);
    })

};

//delect song by given userN, playlistN
module.exports.deletesongtoplaylist = async(req, res, next) => {

    var newuserN = req.body.userN;
    var newplaylistN = req.body.playlistN;
    var newsongN = req.body.songN;

    newsongList = new Array;
    var sample = new Playlist();

    try {
        sample = await Playlist.findOne({ playlistN: newplaylistN, userN: newuserN });
        console.log(sample.songList);
    } catch (error) {
        next(error);
    }
    for (j = 0; j < sample.songList.length; j++) {
        if (sample.songList[j] != newsongN) {
            newsongList.push(sample.songList[j]);
        }
    }
    console.log(newsongList)
    await Playlist.findOneAndUpdate({ playlistN: newplaylistN, userN: newuserN }, { $set: { songList: newsongList } }).then((updatedDoc) => {
        res.send(updatedDoc);

    });
}




// soft search playlist
module.exports.searchplaylist = (req, res) => {
    var word = req.params.id;
    word = word.replace(/\s/g, "");
    console.log(word);
    var _filter = {
        $or: [
            { playlistN: { $regex: word, $options: '$i' } },

        ]
    }

    Playlist.find(_filter, (err, playlist) => {

        if (!playlist) {
            console.log("11");
            return res.status(404).json({ status: false, message: 'No search result found.' });
        } else {
            console.log(playlist);
            return res.status(200).send(playlist);
        }
    })
};


// return all song in playlist 
module.exports.showsonginlist = async(req, res) => {
    var playlist_user = req.params.id;
    var playlist = playlist_user.split("0")[0];
    var user = playlist_user.split("0")[1];

    var arr = new Array();
    Playlist.aggregate(
        [{ $match: { playlistN: playlist, userN: user } }]
    ).then((list) => {
        for (var i = 0; i < list.songList.length; i++) { arr.push(list.songList[i]); }
        console.log(arr);
        return res.status(200).send(arr);
    })

};



// save song to playlist
module.exports.savesongtoplaylist = async(req, res) => {

    var getuserN = req.body.userN;
    var getplaylistN = req.body.playlistN;
    var getsongN = req.body.songN;
    console.log("A", getuserN);
    console.log("B", getplaylistN);
    console.log("C", getsongN);
    var newplaylist = new Playlist();
    var time = new Date;
    var t = time.getTime();

    newplaylist.userN = getuserN;
    newplaylist.playlistN = getplaylistN;
    newplaylist.status = "private";
    newplaylist.description = "";
    newplaylist.playlistT = t;
    newplaylist.songList = [getsongN];

    try {
        var sample = await Playlist.findOne({ playlistN: getplaylistN, userN: getuserN });

    } catch (error) {
        next(error);
    }


    if (sample == null) {
        await newplaylist.save((err, doc) => {
            if (!err) {
                res.send(doc);
            } else {
                return next(err);
            }
        });
    } else {
        var exist = false;

        newsongList = sample.songList;
        for (var i = 0; i < newsongList.length; i++) {
            if (newsongList[i] == getsongN) {
                exist = true;
            }
        }

        if (exist == true) {
            return next();
        } else {
            newsongList.push(getsongN);
        }

        await Playlist.findOneAndUpdate({ playlistN: getplaylistN, userN: getuserN }, { $set: { songList: newsongList } }).then((updatedDoc) => {

            res.send(updatedDoc);

        });

    }
}



// save playlist 
module.exports.addasmyplaylist = async(req, res) => {

    var getuserN = req.body.userN;
    var getplaylistN = req.body.playlistN;
    var getcreaterN = req.body.createrN;


    try {

        var match = await Playlist.findOne({ playlistN: getplaylistN, userN: getuserN });

    } catch (error) {
        next(error);
    }


    if (match != null) {
        console.log("playlist exist")
        return;
    } else {
        var currentplaylist = await Playlist.findOne({ playlistN: getplaylistN, userN: getcreaterN });

        newdsongList = currentplaylist.songList;
        newdescription = currentplaylist.description;
        newstatus = "private";

        var d = new Date();
        var currentTime = d.getTime();
        let playlist = new Playlist({
            userN: getuserN,
            playlistN: getplaylistN,
            status: newstatus,
            description: newdescription,
            playlistT: currentTime,
            songList: newdsongList,
        });

        try {
            const savedplaylist = await playlist.save();
            res.json(savedplaylist);
        } catch (err) {
            res.json({ message: err });
        }

    }
}