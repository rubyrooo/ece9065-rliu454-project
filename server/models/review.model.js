const mongoose = require('mongoose');

//suppose Song Name is unique
var reviewSchema = new mongoose.Schema({
    songN: {
        type: String,
        required: true,
        unique: true


    },
    reviewerN: {
        type: String,
        required: true

    },
    rating: {
        type: String
    },
    reviewC: {
        type: String,
        maxlength: [500]

    },
    reviewT: {
        type: Date

    }
});

mongoose.model('Review', reviewSchema);