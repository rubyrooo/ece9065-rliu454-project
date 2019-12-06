const mongoose = require('mongoose');
const Review = mongoose.model('Review');



// create new song
module.exports.savereview = async(req, res) => {
    var d = new Date();
    var currentTime = d.getTime();
    let review = new Review({
        songN: req.params.id,
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
/* module.exports.showreview = async(req, res) => {

    try {
        const item = await Review.findOne('songN': req.params.id);
        res.json(item);
    } catch (err) {
        res.json({ message: err });
    }

}; */