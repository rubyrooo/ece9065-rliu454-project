const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlSong = require('../controllers/song.controller');
const ctrlReview = require('../controllers/review.controller');
const ctrlPlaylist = require('../controllers/playlist.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/googleregister', ctrlUser.googleregister);
router.post('/oauth/google', ctrlUser.authenticate_google);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/:varify', ctrlUser.varify);
router.post('/authenticate', ctrlUser.authenticate);


//create a song and return title
router.post('/secure/song', ctrlSong.savesong);


//create a review by given song name
router.post('/secure/reviews/:id', ctrlReview.savereview);
//get all review by given song name
router.get('/secure/reviews/:id', ctrlReview.showreview);


//create a review by given song name
router.post('/secure/playlist', ctrlPlaylist.saveplaylist);
//get all playlist b
router.get('/secure/playlist/:id', ctrlPlaylist.showplaylist);

//soft search song
router.get('/open/search/:id', ctrlSong.searchsong);

//top 10 song
router.get('/open/song', ctrlSong.topsong);
//get song by name
router.get('/open/song/:id', ctrlSong.showsong);

module.exports = router;