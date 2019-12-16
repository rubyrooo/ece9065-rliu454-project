const mongoose = require('mongoose');
const User = mongoose.model('User');
const Song = mongoose.model('Song');



module.exports.grantUser = async(req, res, next) => {
    var getemail = req.body.email;
    var getadmin = req.body.admin;
    await User.findOneAndUpdate({ email: getemail }, { $set: { admin: getadmin } }).then((updatedDoc) => {
        console.log(updatedDoc)
        res.send(updatedDoc);

    });
}

module.exports.activeUser = async(req, res, next) => {
    var getemail = req.body.email;
    var getactive = req.body.active;
    await User.findOneAndUpdate({ email: getemail }, { $set: { active: getactive } }).then((updatedDoc) => {
        console.log(updatedDoc)
        res.send(updatedDoc);

    });
}

module.exports.grantSong = async(req, res, next) => {
    var gettitle = req.body.title;
    var gethidden = req.body.hidden;
    await Song.findOneAndUpdate({ title: gettitle }, { $set: { hidden: gethidden } }).then((updatedDoc) => {
        console.log(updatedDoc)
        res.send(updatedDoc);
    });
}


module.exports.getallSong = async(req, res, next) => {
    try {
        var all = await Song.find();

        if (!all) {
            return res.status(404).json({ status: false, message: 'No song record' });
        } else {
            var allsong = new Array();
            for (var i = 0; i < all.length; i++) {

                allsong.push(all[i]);
            }
            console.log(allsong.length)
            return res.status(200).send(allsong);
        }
    } catch (err) {
        res.json({ message: err });
    }

}

module.exports.getallUser = async(req, res, next) => {
    try {
        var all = await User.find();

        if (!all) {
            return res.status(404).json({ status: false, message: 'No user record' });
        } else {
            var alluser = new Array();
            for (var i = 0; i < all.length; i++) {

                alluser.push(all[i]);
            }
            console.log(alluser.length)
            return res.status(200).send(alluser);
        }
    } catch (err) {
        res.json({ message: err });
    }

}