const mongoose = require('mongoose');
const Review = mongoose.model('Review');



// create new song
module.exports.savereview = async(req, res) => {
    var d = new Date();
    var currentTime = d.getTime();
    let review = new Review({
        songN: req.body.songN,
        reviewerN: req.body.reviewerN,
        rating: req.body.rating,
        reviewC: req.body.reviewC,
        reviewT: currentTime
    });

    try {
        const savedreview = await review.save();
        res.json(savedreview);
    } catch (err) {
        res.json({ message: err });
    }
};


// return all reviews by given song name
module.exports.showreview = async(req, res) => {
    var arr = new Array();
    Review.aggregate(
        [{ $match: { songN: req.params.id } }]
    ).sort({ "reviewT": -1 }).then((list) => {
        for (var i = 0; i < list.length; i++) { arr.push(list[i]); }
        console.log(arr);
        return res.status(200).send(arr);
    })

};